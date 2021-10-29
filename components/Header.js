// import { Flex, Heading, Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import { GrGithub, GrTwitter } from 'react-icons/gr'
import { StyledDiv } from '@generates/swag'

export default function Header () {
  return (
    <div alignItems="center">

      <NextLink href="/">
        <a>
          <h1 fontSize="2xl" color="green.200">
            Ian Walter
          </h1>
        </a>
      </NextLink>

      <div ml="auto" color="gray.400">

        <StyledDiv>
          <NextLink href="https://github.com/ianwalter">
            <a aria-label="GitHub">
              <GrGithub />
            </a>
          </NextLink>
        </StyledDiv>

        <StyledDiv ml={6}>
          <NextLink href="https://twitter.com/IanWalter">
            <a aria-label="Twitter">
              <GrTwitter />
            </a>
          </NextLink>
        </StyledDiv>

      </div>

    </div>
  )
}
