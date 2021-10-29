import '../styles.css'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import { globalCss } from '@stitches/react'
import Router from 'next/router'
import nprogress from 'nprogress'
import { StyledDiv, StyledLink } from '@generates/swag'
import Layout from '../components/Layout.js'
import CodeCaption from '../components/CodeCaption.js'

const globalStyles = globalCss({
  body: { backgroundColor: '#18181B', color: '#D4D4D4' }
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
    return <StyledDiv as="h1" my={6} {...props} />
  },
  h2: function H2 (props) {
    return <StyledDiv as="h2" size="lg" my={6} {...props} />
  },
  h3: function H3 (props) {
    return <StyledDiv as="h3" size="md" my={6} {...props} />
  },
  p: function P (props) {
    return <StyledDiv as="p" my={6} {...props} />
  },
  a: function A (props) {
    return <StyledLink
      color="blue.200"
      fontWeight="medium"
      isExternal={props.href.indexOf('http') === 0}
      {...props}
    />
  },
  ul: function Ul (props) {
    return <StyledDiv as="ul" {...props} />
  },
  inlineCode: function InlineCode (props) {
    return (
      <StyledDiv
        as="code"
        colorScheme="purple"
        fontSize="md"
        borderRadius={3}
        px={2}
        {...props}
      />
    )
  },
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
