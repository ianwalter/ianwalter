import { Box } from '@chakra-ui/react'

export default function CodeCaption ({ children, ...props }) {
  return (
    <Box {...props}>
      {children}
    </Box>
  )
}
