import { Flex, Heading, Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import { GrGithub, GrTwitter } from 'react-icons/gr'

export default function Header () {
  return (
    <Flex alignItems="center">

      <NextLink href="/">
        <a>
          <Heading as="h1" fontSize="2xl" className="text-gradient">
            Ian Walter
          </Heading>
        </a>
      </NextLink>

      <Flex ml="auto" color="gray.400">

        <Box>
          <NextLink href="https://github.com/ianwalter">
            <a>
              <GrGithub />
            </a>
          </NextLink>
        </Box>

        <Box ml={4}>
          <NextLink href="https://github.com/ianwalter">
            <a>
              <GrTwitter />
            </a>
          </NextLink>
        </Box>

      </Flex>

    </Flex>
  )
}
