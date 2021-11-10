import { test } from '@ianwalter/bff'
import eslint from 'eslint'

const { ESLint } = eslint

test('pass', async t => {
  const lint = new ESLint()
  const file = 'tests/fixtures/pass.js'
  const [pass] = await lint.lintFiles([file])
  t.expect(pass).toMatchSnapshot({ filePath: t.expect.stringContaining(file) })
})

test('fail', async t => {
  const lint = new ESLint()
  const file = 'tests/fixtures/fail.js'
  const [fail] = await lint.lintFiles([file])
  t.expect(fail).toMatchSnapshot({ filePath: t.expect.stringContaining(file) })
})
