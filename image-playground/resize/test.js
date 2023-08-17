'use strict';

const path = require('path');
const { resize2Trim } = require('.');

async function main() {
  const originPath = path.resolve(__dirname, 'origin.png');
  const resPath = path.resolve(__dirname, 'res.png');

  const res = await resize2Trim(originPath, resPath);

  console.log(res);
}

main().then().catch(console.log);
  