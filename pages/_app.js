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

const components = {
  wrapper: function Wrapper (props) {
    if (props.layout === false) return props.children
    return <Layout {...props} />
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
    return <Link color="blue.200" fontWeight="medium" {...props} />
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
  // Intro: function Intro () {
  //   return (
  //     <>
  //       This is my pesonal website that I built with {''}
  //       <Link href="https://nextjs.org/" color="blue.200" isExternal>
  //         Next.js
  //       </Link>
  //       . The source code is available on GitHub at {''}
  //       <Link
  //         href="https://github.com/ianwalter/ianwalter"
  //         color="blue.200"
  //         isExternal
  //       >
  //         https://github.com/ianwalter/ianwalter
  //       </Link>
  //     </>
  //   )
  // }
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
