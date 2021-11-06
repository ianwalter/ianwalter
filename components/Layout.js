// import { Box } from '@chakra-ui/react'
import { StyledEl } from '@generates/swag'
import Header from './Header.js'
import Footer from './Footer.js'

export default function Layout (props) {
  return (
    <StyledEl
      css={{
        maxWidth: '56rem',
        mx: 'auto',
        px: [6, 6, 6, 6, 0],
        paddingTop: '2rem'
      }}
    >

      <Header />

      <StyledEl as="main" css={{ marginTop: '2.5rem' }}>
        {props.children}
      </StyledEl>

      <Footer />

    </StyledEl>
  )
}
