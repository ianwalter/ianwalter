import { StyledDiv } from '@generates/swag'

export default function CodeCaption ({ children, ...props }) {
  return (
    <StyledDiv
      mt={-5}
      mb={5}
      color="gray.400"
      textAlign="center"
      fontSize="85%"
      {...props}
    >
      {children}
    </StyledDiv>
  )
}
