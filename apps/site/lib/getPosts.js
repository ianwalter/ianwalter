const path = require('path')
const { promises: fs } = require('fs')
const mdxtract = require('@ianwalter/mdxtract')
const deconstructFilename = require('./deconstructFilename.js')

const postsDir = path.resolve('pages/posts')

function toPost (isExternal) {
  return async post => {
    const content = await fs.readFile(path.join(postsDir, post.filename))
    return {
      ...post,
      ...await mdxtract(content),
      url: isExternal
        ? `https://ianwalter.dev/${post.slug}`
        : `/posts/${post.slug}`
    }
  }
}

module.exports = async function getPosts ({ isExternal }) {
  const files = await fs.readdir(postsDir)
  const posts = files
    .map(deconstructFilename)
    .filter(f => f.filename.includes('.mdx'))
    .map(toPost(isExternal))
  return Promise.all(posts)
}
