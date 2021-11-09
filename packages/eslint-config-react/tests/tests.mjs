import { test } from '@ianwalter/bff'
import { CLIEngine } from 'eslint'

test('pass', ({ expect }) => {
  const cli = new CLIEngine({ configFile: 'preact.js' })
  const file = 'tests/fixtures/pass.jsx'
  const { results: [pass] } = cli.executeOnFiles([file])
  expect(pass).toMatchSnapshot({ filePath: expect.stringContaining(file) })
})

test('fail', ({ expect }) => {
  const cli = new CLIEngine({ configFile: 'preact.js' })
  const file = 'tests/fixtures/fail.jsx'
  const { results: [fail] } = cli.executeOnFiles([file])
  expect(fail).toMatchSnapshot({ filePath: expect.stringContaining(file) })
})
