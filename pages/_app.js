import '../styles.css'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import {
  ChakraProvider,
  Heading,
  Box,
  Link,
  Code,
  UnorderedList
} from '@chakra-ui/react'
import theme from '../lib/theme.js'
import Layout from '../components/Layout.js'
import CodeCaption from '../components/CodeCaption.js'

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
    return <Heading as="h1" my={6} {...props} />
  },
  h2: function H2 (props) {
    return <Heading as="h2" size="lg" my={6} {...props} />
  },
  h3: function H3 (props) {
    return <Heading as="h3" size="md" my={6} {...props} />
  },
  p: function P (props) {
    return <Box as="p" my={6} {...props} />
  },
  a: function A (props) {
    return <Link
      color="blue.200"
      fontWeight="medium"
      isExternal={props.href.indexOf('http') === 0}
      {...props}
    />
  },
  ul: function Ul (props) {
    return <UnorderedList {...props} />
  },
  inlineCode: function InlineCode (props) {
    return (
      <Code
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
  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ChakraProvider>
  )
}
