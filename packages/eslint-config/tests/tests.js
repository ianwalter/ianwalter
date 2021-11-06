const { test } = require('@ianwalter/bff')
const { CLIEngine } = require('eslint')

test('pass', ({ expect }) => {
  const cli = new CLIEngine()
  const file = 'tests/fixtures/pass.js'
  const { results: [pass] } = cli.executeOnFiles([file])
  expect(pass).toMatchSnapshot({ filePath: expect.stringContaining(file) })
})

test('fail', ({ expect }) => {
  const cli = new CLIEngine()
  const file = 'tests/fixtures/fail.js'
  const { results: [fail] } = cli.executeOnFiles([file])
  expect(fail).toMatchSnapshot({ filePath: expect.stringContaining(file) })
})
