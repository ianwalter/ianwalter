import '../main.css'
import { MDXProvider } from '@mdx-js/react'
import { ChakraProvider, Heading, Box, Link, Code } from '@chakra-ui/react'
import theme from '../lib/theme.js'
import Layout from '../components/Layout.js'

const components = {
  wrapper: function Wrapper ({ layout, ...props }) {
    return (
      <Layout>
        <main {...props} />
      </Layout>
    )
  },
  h1: function H1 (props) {
    return <Heading as="h1" my={8} {...props} />
  },
  p: function P (props) {
    return <Box as="p" my={6} {...props} />
  },
  a: function A (props) {
    return <Link color="blue.200" fontWeight="medium" {...props} />
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
  }
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
