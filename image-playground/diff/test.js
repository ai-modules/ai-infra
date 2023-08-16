'use strict';

const fs = require('fs');
const path = require('path');

const pixelDiff = require('./pixel-diff');

async function main() {
  const img1Path = fs.readFileSync(path.resolve(__dirname, '1.png'));
  const img2Path = fs.readFileSync(path.resolve(__dirname, '2.png'));
  const diffPath = path.resolve(__dirname, 'diff.png');
  const res = await pixelDiff(img1Path, img2Path, {
    diffPath,
    diffMask: false,
  });
  console.log('diff value: %d', res.value);
}

main().then().catch(console.log);
