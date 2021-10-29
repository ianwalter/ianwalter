// import { Box } from '@chakra-ui/react'
import { StyledDiv } from '@generates/swag'
import Header from './Header.js'
import Footer from './Footer.js'

export default function Layout (props) {
  return (
    <StyledDiv maxWidth="4xl" mx="auto" px={[6, 6, 6, 6, 0]} pt={12}>

      <Header />

      <StyledDiv as="main" mt={12}>
        {props.children}
      </StyledDiv>

      <Footer />

    </StyledDiv>
  )
}
