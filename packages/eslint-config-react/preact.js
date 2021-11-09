const config = require('./.eslintrc.json')

module.exports = {
  ...config,
  settings: {
    react: {
      ...config.settings.react,
      pragma: 'h'
    }
  }
}
