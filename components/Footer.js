import { StyledEl } from '@generates/swag'

export default function Footer () {
  return (
    <StyledEl
      css={{
        marginTop: '8rem',
        marginBottom: '3rem',
        color: '$coolGray400',
        fontSize: '0.875rem',
        textAlign: 'center'
      }}
    >
      Copyright © Ian Walter
    </StyledEl>
  )
}
