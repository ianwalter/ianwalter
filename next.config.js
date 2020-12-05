const { promises: fs } = require('fs')
const path = require('path')
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

function toRewrite (file) {
  const filename = file.split('.')[0]
  const slug = filename.split('~')[1]
  return { source: `/${slug}`, destination: `/posts/${filename}`  }
}

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  async rewrites () {
    const files = await fs.readdir(path.join(__dirname, 'pages/posts'))
    return files.map(toRewrite)
  }
})
