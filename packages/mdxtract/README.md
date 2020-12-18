# @ianwalter/mdxtract
> Extract data from mdx files

[![npm page][npmImage]][npmUrl]
[![CI][ciImage]][ciUrl]

## About

Originally based on [extract-mdx-metadata][emmUrl].

## Usage

```js
const path = require('path')
const { promises: fs } = require('fs')
const mdxtract = require('.')

const filePath = path.join(__dirname, 'fixtures/example.mdx')
const content = await fs.readFile(filePath, 'utf-8')
const data = await mdxtract(content)
```

## Install

```
pnpm add @ianwalter/mdxtract
```

## License

Hippocratic License - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://ianwalter.dev)

[npmImage]: https://img.shields.io/npm/v/@ianwalter/mdxtract.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/mdxtract
[ciImage]: https://github.com/ianwalter/mdxtract/workflows/CI/badge.svg
[ciUrl]: https://github.com/ianwalter/mdxtract/actions
[emmUrl]: https://github.com/manovotny/extract-mdx-metadata
[licenseUrl]: https://github.com/ianwalter/mdxtract/blob/main/LICENSE
