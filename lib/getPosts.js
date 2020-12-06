const path = require('path')
const { promises: fs } = require('fs')
const mdxtract = require('@ianwalter/mdxtract')
const deconstructFilename = require('./deconstructFilename')

async function toPost (post) {
  const filePath = path.join(__dirname, '../pages/posts', post.filename)
  const content = await fs.readFile(filePath)
  return {
    ...post,
    ...await mdxtract(content),
    url: `https://ianwalter.dev/${post.slug}`
  }
}

module.exports = async function getPosts () {
  const files = await fs.readdir(path.join(__dirname, '../pages/posts'))
  const posts = files.map(deconstructFilename).filter(f => f.slug).map(toPost)
  return Promise.all(posts)
}
