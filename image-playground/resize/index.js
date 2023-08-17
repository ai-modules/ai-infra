'use strict';

const sharp = require('sharp');

async function resize2Trim(originPath, resPath) {
  return new Promise((resolve, reject) => {
    sharp(originPath)
      .trim()
      .toFile(resPath, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
  });
}

async function aaa(originPath, resPath) {
  return new Promise((resolve, reject) => {
    sharp(originPath)
      .trim()
      .resize(55, 27, { fit: 'inside' })
      .toFile(resPath, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
  });
}

exports.aaa = aaa;
exports.resize2Trim = resize2Trim;
