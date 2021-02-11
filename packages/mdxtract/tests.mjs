import path from 'path'
import { promises as fs } from 'fs'
import { test } from '@ianwalter/bff'
import mdxtract from './index.js'

test('mdxtract', async t => {
  const filePath = new URL('fixtures/example.mdx', import.meta.url)
  const content = await fs.readFile(filePath, 'utf-8')
  const data = await mdxtract(content)
  t.logger.log(data)
  t.expect(data.author).toBe('Ian')
  t.expect(data.meta.layout).toBe('blog')
  t.expect(data.title).toBe('My title')
})
