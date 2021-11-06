import '../styles.css'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import { globalCss } from '@stitches/react'
import Router from 'next/router'
import nprogress from 'nprogress'
import { StyledEl } from '@generates/swag'
import Layout from '../components/Layout.js'
import Link from '../components/Link.js'
import CodeCaption from '../components/CodeCaption.js'
import InlineCode from '../components/InlineCode.js'

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
    backgroundColor: 'rgb(23, 25, 35)',
    fontSize: '1.25rem',
    color: '#F3F4F6',
    lineHeight: '1.75',
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
    return <StyledEl
      as="h1"
      css={{ lineHeight: '1.2', fontSize: '2.25rem', my: '1.5rem' }}
      {...props}
    />
  },
  h2: function H2 (props) {
    return <StyledEl
      as="h2"
      css={{ lineHeight: '1.2', fontSize: '1.875rem', my: '1.5rem' }}
      {...props}
    />
  },
  h3: function H3 (props) {
    return <StyledEl as="h3" size="md" css={{ my: '1.5rem' }} {...props} />
  },
  p: function P (props) {
    return <StyledEl as="p" css={{ my: '1.5rem' }} {...props} />
  },
  a: function A (props) {
    return <Link
      rel={props.href.indexOf('http') === 0 && 'noopener'}
      {...props}
    />
  },
  ul: function Ul (props) {
    return <StyledEl as="ul" {...props} />
  },
  inlineCode: InlineCode,
  CodeCaption
}

export default function App ({ Component, pageProps }) {
  globalStyles()

  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}
