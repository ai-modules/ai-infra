#!/usr/bin/env node

'use strict';

const { Command } = require('commander');
const pixelDiff = require('../image-playground/diff/pixel-diff');

const program = new Command().version(require('../package.json').version);

program
  .command('diff <img1> <img2>')
  .option('-j, --json', '是否使用 json 输出')
  .option('-d, --debug', '是否使用输出中间图片产物')
  .option('--output <output>', '中间产物输出路径')
  .description('图片相似度对比，目前只支持 PNG 格式')
  .usage('ai-infra diff ./img1.png ./img2.pmg')
  .action((img1, img2, opts) => {
    pixelDiff(img1, img2, opts);
  });

program.parse(process.argv);