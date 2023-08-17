'use strict';

const fs = require('fs');
const path = require('path');

const pixelDiff = require('./pixel-diff');

async function main() {
  const img1Path = path.join(__dirname, '1.png');
  const img2Path = path.join(__dirname, '2.png');
  const res = await pixelDiff(img1Path, img2Path, { debug: true });
  console.log('similarity: %d', res.similarity);
}

main().then().catch(console.log);
