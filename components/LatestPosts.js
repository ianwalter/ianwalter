import NextLink from 'next/link'
// import { Box, Heading, UnorderedList, ListItem, Link } from '@chakra-ui/react'
import { StyledDiv, StyledLink } from '@generates/swag'

export default function LatestPosts (props) {
  return (
    <StyledDiv mt={12}>

      <h2 as="h2" size="lg">
        My latest posts 💬
      </h2>

      <ul mt={6} color="gray.400">
        {props.posts && props.posts.map(post => (
          <li key={post.url}>
            <NextLink href={post.url} passHref>
              <StyledLink color="blue.200" fontWeight="medium">
                {post.title}
              </StyledLink>
            </NextLink>
          </li>
        ))}
      </ul>

    </StyledDiv>
  )
}
