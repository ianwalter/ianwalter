const { promises: fs } = require('fs')
const path = require('path')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [require('@mapbox/rehype-prism')]
  }
})
const deconstructFilename = require('./lib/deconstructFilename')

function toRewrite (filename) {
  const { slug } = deconstructFilename(filename)
  return { source: `/${slug}`, destination: `/posts/${slug}` }
}

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  async rewrites () {
    const files = await fs.readdir(path.join(__dirname, 'pages/posts'))
    return files.map(toRewrite)
  }
})
