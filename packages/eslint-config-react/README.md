# @ianwalter/eslint-config-react
> Ian's ESLint configuration for [React][reactUrl] and [Preact][preactUrl]

[![npm page][npmImage]][npmUrl]

## Installation

```console
yarn add @ianwalter/eslint-config-react --dev
```

## Usage

In `package.json`, for React:

```js
  "eslintConfig": {
    "root": true,
    "extends": [
      "@ianwalter/react"
    ]
  }
```

For Preact:

```js
  "eslintConfig": {
    "root": true,
    "extends": [
      "@ianwalter/eslint-config-react/preact"
    ]
  }
```

## Related

* [`@ianwalter/eslint-config`][configUrl] - Ian's ESLint configuration
* [`@ianwalter/eslint-config-vue`][vueUrl] - Ian's ESLint configuration for
  Vue.js

## License

Apache 2.0 with Commons Clause - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://ianwalter.dev)

[eslintUrl]: https://eslint.org/
[reactUrl]: https://reactjs.org/
[preactUrl]: https://preactjs.com/
[npmImage]: https://img.shields.io/npm/v/@ianwalter/eslint-config-react.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/eslint-config-react
[configUrl]: https://github.com/ianwalter/eslint-config
[vueUrl]: https://github.com/ianwalter/eslint-config-vue
[licenseUrl]: https://github.com/ianwalter/ianwalter/blob/main/packages/eslint-config-react/LICENSE
