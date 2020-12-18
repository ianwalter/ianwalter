import { Box } from '@chakra-ui/react'
import Header from './Header.js'
import Footer from './Footer.js'

export default function Layout (props) {
  return (
    <Box maxWidth="4xl" mx="auto" px={[6, 6, 6, 6, 0]} pt={12}>

      <Header />

      <Box as="main" mt={12}>
        {props.children}
      </Box>

      <Footer />

    </Box>
  )
}
