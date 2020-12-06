import { ChakraProvider } from '@chakra-ui/react'
import { MDXProvider } from '@mdx-js/react'
import { Heading, Box, Link } from '@chakra-ui/react'
import theme from '../theme.js'
import Layout from '../components/Layout.js'

const components = {
  wrapper: ({ layout, ...props }) => {
    return (
      <Layout>
        <main {...props} />
      </Layout>
    )
  },
  h1: props => <Heading as="h1" my={8} {...props} />,
  p: props => <Box as="p" my={6} {...props} />,
  a: props => <Link color="blue.200" fontWeight="medium" {...props} />
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
