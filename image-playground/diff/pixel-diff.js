'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const chalk = require('chalk');

async function pixelDiff(rawImage, generateImage, opts = {}) {
  const data1 = await sharp(rawImage).trim().toBuffer();
  const data2 = await sharp(generateImage).trim().toBuffer();

  const png1 = PNG.sync.read(data1);
  const targetWidth = png1.width;
  const targetHeight = png1.height;

  const png2 = PNG.sync.read(
    await sharp(data2)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: sharp.fit.contain,
      }).png().toBuffer());

  const diff = new PNG({ width: targetWidth, height: targetHeight });
  const diffPixels = pixelmatch(
    png1.data,
    png2.data,
    diff.data,
    targetWidth,
    targetHeight,
    { threshold: 0.1 }
  );

  const json = {
    similarity: (1 - diffPixels / (diff.width * diff.height)),
    diff: diffPixels,
    width: targetWidth,
    height: targetHeight,
  };

  if (opts.debug) {
    const rawbase = path.basename(rawImage);
    const genbase = path.basename(generateImage);
    const rawext = path.extname(rawImage);
    const genext = path.extname(generateImage);
    const pwd = path.join(opts.output ? path.resolve(opts.output) : process.cwd(), 'ai-infra-diff');
    if (!fs.existsSync(pwd)) {
      fs.mkdirSync(pwd, { recursive: true });
    }
    fs.writeFileSync(path.join(pwd, `${rawbase.replace(rawext, '')}@1${rawext}`), PNG.sync.write(png1));
    fs.writeFileSync(path.join(pwd, `${genbase.replace(genext, '')}@2${genext}`), PNG.sync.write(PNG.sync.read(data2)));
    fs.writeFileSync(path.join(pwd, `${rawbase.replace(rawext, '')}_resize@1${rawext}`), PNG.sync.write(png1));
    fs.writeFileSync(path.join(pwd, `${genbase.replace(genext, '')}_resize@2${genext}`), PNG.sync.write(png2));

    const diffPrefix = `${rawbase.replace(rawext, '')}@1_${genbase.replace(genext, '')}@2_diff`;
    await new Promise(resolve => {
      const writeStream = fs.createWriteStream(path.join(pwd, `${diffPrefix}${genext}`));
      diff.pack().pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', resolve);
    });

    fs.writeFileSync(path.join(pwd, `${diffPrefix}.json`), JSON.stringify(json, null, 2));
    console.log(`中间产物已输出至目录: ${chalk.greenBright(pwd)}`);
  }

  if (opts.json) {
    console.log({
      similarity: json.similarity,
    });
  } else {
    console.log(`两张图片的相似度: ${chalk.greenBright(`${Number((json.similarity * 100).toFixed(2))}%`)}`);
  }

  return json;
}

module.exports = pixelDiff;
