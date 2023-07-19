import { StyledEl } from '@generates/swag'

export default function CodeCaption ({ children, ...props }) {
  return (
    <StyledEl
      css={{
        marginTop: '-1rem',
        marginBottom: '2rem',
        color: '$blueGray400',
        textAlign: 'center',
        fontSize: '80%'
      }}
      {...props}
    >
      {children}
    </StyledEl>
  )
}
