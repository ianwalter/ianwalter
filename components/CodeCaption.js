import { Box } from '@chakra-ui/react'

export default function CodeCaption ({ children, ...props }) {
  return (
    <Box
      mt={-5}
      mb={5}
      color="gray.400"
      textAlign="center"
      fontSize="85%"
      {...props}
    >
      {children}
    </Box>
  )
}
