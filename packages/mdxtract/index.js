const { parse } = require('@babel/parser')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default
const mdx = require('@mdx-js/mdx')
const visit = require('unist-util-visit')

const parseOptions = { plugins: ['jsx'], sourceType: 'module' }

module.exports = async function mdxtract (content) {
  const data = {}

  await mdx(
    content,
    {
      remarkPlugins: [
        () => tree => {
          // Add any exports to data.
          visit(
            tree,
            'export',
            node => {
              traverse(
                parse(node.value, parseOptions),
                {
                  VariableDeclarator (path) {
                    const { code } = generate(path.node.init)
                    // eslint-disable-next-line no-eval
                    data[path.node.id.name] = eval(`module.exports = ${code}`)
                  }
                }
              )
            }
          )

          // Add the first H1 as the title.
          const byIsFirstHeading = c => c.type === 'heading' && c.depth === 1
          const firstHeading = tree.children.find(byIsFirstHeading)
          if (firstHeading && firstHeading && firstHeading.children.length) {
            data.title = firstHeading.children[0].value
          }
        }
      ]
    }
  )

  return data
}
