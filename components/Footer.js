import { StyledEl } from '@generates/swag'

export default function Footer () {
  return (
    <StyledEl
      css={{
        marginTop: '8rem',
        marginBottom: '3rem',
        color: '$coolGray400',
        fontSize: '14px',
        textAlign: 'center'
      }}
    >
      Copyright © 2020 Ian Walter
    </StyledEl>
  )
}
