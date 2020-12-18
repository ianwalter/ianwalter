const path = require('path')
const { promises: fs } = require('fs')
const mdxtract = require('.')

async function run () {
  const filePath = path.join(__dirname, 'fixtures/example.mdx')
  const content = await fs.readFile(filePath, 'utf-8')
  console.log('Data:', await mdxtract(content))
}

run()
