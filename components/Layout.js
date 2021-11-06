import { StyledEl } from '@generates/swag'
import Header from './Header.js'
import Footer from './Footer.js'

export default function Layout (props) {
  return (
    <StyledEl
      css={{
        maxWidth: '56rem',
        mx: 'auto',
        paddingTop: '2rem',
        px: '1.5rem',
        '@lg': {
          px: 0
        }
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
