const path = require('path')
const { promises: fs } = require('fs')
const { stripIndent, stripIndents } = require('common-tags')
const getPosts = require('../lib/getPosts')

const pagesPath = path.join(__dirname, '../pages')
const intro = stripIndent`
  This repo ([ianwalter/ianwalter](https://github.com/ianwalter/ianwalter))
  contains my personal website at
  [https://ianwalter.dev](https://ianwalter.dev).
`

async function run () {
  const posts = await getPosts()
  const latest = posts.reverse().slice(0, 5)
  const index = await fs.readFile(path.join(pagesPath, 'index.mdx'), 'utf-8')
  const readme = index.replace('<Intro />', intro)

  // const readme = stripIndents`
  //   ${title}
  //   ### My latest posts 💬

  //   ${latest.map(post => `* [${post.title}](${post.url})`).join('\n')}

  //   <!--
  //   Here are some ideas to get you started:

  //   - 🔭 I’m currently working on ...
  //   - 🌱 I’m currently learning ...
  //   - 👯 I’m looking to collaborate on ...
  //   - 🤔 I’m looking for help with ...
  //   - 💬 Ask me about ...
  //   - 📫 How to reach me: ...
  //   - 😄 Pronouns: ...
  //   - ⚡ Fun fact: ...
  //   -->
  // `

  await fs.writeFile('README.md', readme + '\n')
}

run()
