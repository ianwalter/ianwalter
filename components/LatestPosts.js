import NextLink from 'next/link'
import { Box, Heading, UnorderedList, ListItem, Link } from '@chakra-ui/react'

export default function LatestPosts (props) {
  return (
    <Box mt={12}>

      <Heading as="h2" size="lg">
        My latest posts 💬
      </Heading>

      <UnorderedList mt={6} color="gray.400">
        {props.posts && props.posts.map(post => (
          <ListItem key={post.url}>
            <NextLink href={post.url} passHref>
              <Link color="blue.200" fontWeight="medium">
                {post.title}
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </UnorderedList>

    </Box>
  )
}
