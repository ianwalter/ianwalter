import NextLink from 'next/link'
import { StyledEl } from '@generates/swag'
import Link from '../components/Link.js'

export default function LatestPosts (props) {
  return (
    <StyledEl css={{ marginTop: '2.5rem' }}>

      <StyledEl as="h2" css={{ margin: 0, fontSize: '30px' }}>
        My latest posts 💬
      </StyledEl>

      <StyledEl as="ul" css={{ paddingLeft: '1.5rem', color: '$blueGray400' }}>
        {props.posts && props.posts.map(post => (
          <StyledEl as="li" key={post.url} css={{ my: '.25rem' }}>
            <NextLink href={post.url} passHref>
              <Link css={{ fontWeight: '500' }}>
                {post.title}
              </Link>
            </NextLink>
          </StyledEl>
        ))}
      </StyledEl>

    </StyledEl>
  )
}
