const { promises: fs } = require('fs')
const { stripIndent } = require('common-tags')
const getPosts = require('../lib/getPosts')

async function run () {
  const posts = await getPosts()
  const readme = stripIndent`
    # Ayyy 👋

    ## 💬 Latest posts

    ${posts.slice(0, 5).map(post => `* [${post.title}](${post.url})\n`)}

    <!--
    Here are some ideas to get you started:

    - 🔭 I’m currently working on ...
    - 🌱 I’m currently learning ...
    - 👯 I’m looking to collaborate on ...
    - 🤔 I’m looking for help with ...
    - 💬 Ask me about ...
    - 📫 How to reach me: ...
    - 😄 Pronouns: ...
    - ⚡ Fun fact: ...
    -->
  `

  await fs.writeFile('README.md', readme + '\n')
}

run()
