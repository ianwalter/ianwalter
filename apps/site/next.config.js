const withMDX = require('@next/mdx')()

module.exports = withMDX({
  reactStrictMode: true,
  output: 'export',
  experimental: {
    mdxRs: true,
  },
});
