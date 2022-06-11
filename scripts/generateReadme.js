const path = require('path')
const { promises: fs } = require('fs')
const { stripIndents } = require('common-tags')
// const getPosts = require('../lib/getPosts')

async function run () {
  // const posts = await getPosts()
  // const latest = posts.reverse().slice(0, 5)
  const intro = await fs.readFile(path.join('./static/intro.mdx'), 'utf-8')
  const index = await fs.readFile(path.join('./pages/index.mdx'), 'utf-8')
  const readme = stripIndents`
    This repo ([ianwalter/ianwalter](https://github.com/ianwalter/ianwalter))
    contains my personal website at
    [https://ianwalter.dev](https://ianwalter.dev).

    ${intro.slice(intro.indexOf('#'))}
  `

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
