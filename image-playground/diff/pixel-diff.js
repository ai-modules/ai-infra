'use strict';

const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

async function pixelDiff(img1Path, img2Path, _options = {}) {
  const defaultOptions = {
    threshold: 0.1,
    diffMask: true,
  };

  const options = Object.assign(defaultOptions, _options);

  const img1 = PNG.sync.read(img1Path);
  const img2 = PNG.sync.read(img2Path);

  const { width, height } = img1;

  const stream = new PNG({
    width,
    height,
  });

  const value = pixelmatch(img1.data, img2.data, stream.data, width, height, options);

  if (options.diffPath) {
    fs.writeFileSync(options.diffPath, PNG.sync.write(stream));  
  }

  const total = width * height;

  return {
    stream,
    value,
    total,
  };
}

module.exports = pixelDiff;
