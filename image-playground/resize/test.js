'use strict';

const path = require('path');
const { resize2Trim, aaa } = require('.');
const pixelDiff = require('../diff/pixel-diff');

async function sample1() {
  const originPath = path.resolve(__dirname, 'origin.png');
  const resPath = path.resolve(__dirname, 'res.png');
  const res = await resize2Trim(originPath, resPath);
  console.log(res);
}

async function sample2() {
  const originPath1 = path.resolve(__dirname, 'sample-1-0.png');
  const resPath1 = path.resolve(__dirname, 'sample-1-0-res.png');
  const res1 = await resize2Trim(originPath1, resPath1);
  console.log(res1);
  const originPath2 = path.resolve(__dirname, 'sample-1-1.png');
  const resPath2 = path.resolve(__dirname, 'sample-1-1-res.png');
  const res2 = await resize2Trim(originPath2, resPath2);
  console.log(res2);
}

async function main() {
  // await sample2();
  const originPath1 = path.resolve(__dirname, 'sample-1-0.png');
  const resPath1 = path.resolve(__dirname, 'sample-1-0-res.png');
  const res1 = await aaa(originPath1, resPath1);
  console.log(res1);
  const originPath2 = path.resolve(__dirname, 'sample-1-1.png');
  const resPath2 = path.resolve(__dirname, 'sample-1-1-res.png');
  const res2 = await aaa(originPath2, resPath2);
  console.log(res2);

  const diff = await pixelDiff(resPath1, resPath2);
  console.log(diff);
}

main().then().catch(console.log);
  