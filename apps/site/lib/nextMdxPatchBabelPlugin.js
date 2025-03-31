/**
 * Currently it's not possible to export data fetching functions from MDX pages
 * because MDX includes them in `layoutProps`, and Next.js removes them at some
 * point, causing a `ReferenceError`.
 *
 * https://github.com/mdx-js/mdx/issues/742#issuecomment-612652071
 *
 * This plugin can be removed once MDX removes `layoutProps`, at least that
 * seems to be the current plan.
 */
module.exports = () => {
  return {
    visitor: {
      ObjectProperty (path) {
        if (
          path.node.value.name === 'getStaticProps' &&
          path.findParent(path =>
            path.isVariableDeclarator() &&
            path.node.id.name === 'layoutProps'
          )
        ) {
          path.remove()
        }
      }
    }
  }
}
