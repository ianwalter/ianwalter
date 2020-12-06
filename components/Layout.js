import { Box } from '@chakra-ui/react'

export default function Layout (props) {
  return (
    <Box maxWidth="4xl" mx="auto" px={[6, 6, 6, 6, 0]} pt={8}>
      {props.children}
    </Box>
  )
}
