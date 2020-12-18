const path = require('path')
const { promises: fs } = require('fs')
const { test } = require('@ianwalter/bff')
const mdxtract = require('.')

test('mdxtract', async t => {
  const filePath = path.join(__dirname, 'fixtures/example.mdx')
  const content = await fs.readFile(filePath, 'utf-8')
  const data = await mdxtract(content)
  t.logger.log(data)
  t.expect(data.author).toBe('Ian')
  t.expect(data.meta.layout).toBe('blog')
  t.expect(data.title).toBe('My title')
})
