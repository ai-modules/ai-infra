# ai-infra

[![NPM version][npm-image]][npm-url]
[![CI][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/ai-infra.svg
[npm-url]: https://npmjs.org/package/ai-infra
[ci-image]: https://github.com/ai-modules/ai-infra/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/ai-modules/ai-infra/actions/workflows/ci.yml
[codecov-image]: https://img.shields.io/codecov/c/github/ai-modules/ai-infra.svg?logo=codecov
[codecov-url]: https://codecov.io/gh/ai-modules/ai-infra
[node-image]: https://img.shields.io/badge/node.js-%3E=_16-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/ai-infra.svg
[download-url]: https://npmjs.org/package/ai-infra

> ai infra

## Installment

```bash
$ npm i ai-infra --save-dev
```

## Usage

```javascript
const { pixelDiff } = require('ai-infra');

// example
// https://github.com/ai-modules/ai-infra/blob/master/image-playground/diff/test.js
```

### CLI

```bash
$ npm i ai-infra -g
```

Command:

```bash
Usage: ai-infra [options] [command]

Commands:
  diff [options] <img1> <img2>  图片相似度对比，目前只支持 PNG 格式
```

## License

The MIT License (MIT)
