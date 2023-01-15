import '../styles.css'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import Router from 'next/router'
import nprogress from 'nprogress'
import { globalCss } from '@generates/swag'
import Layout from '../components/Layout.js'
import CodeCaption from '../components/CodeCaption.js'
import InlineCode from '../components/InlineCode.js'
import PostDate from '../components/PostDate.js'
import linkStyle from '../styles/linkStyle.js'

const globalStyles = globalCss({
  body: {
    fontFamily: `
      "Inter var",
      "Helvetica Neue Light",
      "Helvetica Neue",
      Helvetica,
      Arial,
      "Lucida Grande",
      sans-serif
    `,
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  }
})

nprogress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => nprogress.start())
Router.events.on('routeChangeComplete', () => nprogress.done())
Router.events.on('routeChangeError', () => nprogress.done())

const components = {
  wrapper: function Wrapper ({ children, ...props }) {
    if (props.layout === false) return children
    const h1Node = children.find(c => c.props.mdxType === 'h1')
    return (
      <Layout {...props}>

        {h1Node && h1Node.props && h1Node.props.children && (
          <Head>
            <title>{h1Node.props.children}</title>
          </Head>
        )}

        {children}

      </Layout>
    )
  },
  h1: function H1 (props) {
    return <h1
      className="text-4xl my-6 font-bold"
      {...props}
    />
  },
  h2: function H2 (props) {
    return <h2
      className="text-3xl font-semibold my-6"
      {...props}
    />
  },
  h3: function H3 (props) {
    return <h3
      className="text-2xl font-semibold my-6"
      {...props}
    />
  },
  p: function P (props) {
    return <p
      className="my-6"
      {...props}
    />
  },
  a: function A (props) {
    return <a
      className={linkStyle}
      {...props.href.indexOf('http') === 0 && { rel: 'noopener' }}
      {...props}
    />
  },
  ul: function Ul (props) {
    return <ul
      className="pl-5 my-6 list-disc"
      {...props}
    />
  },
  inlineCode: InlineCode,
  CodeCaption,
  PostDate
}

export default function App ({ Component, pageProps }) {
  globalStyles()

  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}
