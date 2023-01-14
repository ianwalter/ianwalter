import Link from 'next/link'
import { GrGithub, GrTwitter } from 'react-icons/gr'
import { StyledEl } from '@generates/swag'

export default function Header () {
  return (
    <StyledEl css={{ display: 'flex', alignItems: 'center' }}>

      <Link href="/">
        <StyledEl
          as="h1"
          css={{ fontSize: '24px', color: '$emerald200', margin: 0 }}
        >
          Ian Walter
        </StyledEl>
      </Link>

      <StyledEl
        css={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto',
          color: '$blueGray400'
        }}
      >

        <StyledEl>
          <Link
            href="https://github.com/ianwalter"
            aria-label="GitHub"
          >
            <GrGithub style={{ display: 'block' }} />
          </Link>
        </StyledEl>

        {/* <StyledEl css={{ marginLeft: '1.5rem' }}>
          <Link href="https://twitter.com/IanWalter" passHref>
            <StyledEl as="a" aria-label="Twitter" css={{ color: 'inherit' }}>
              <GrTwitter style={{ display: 'block' }} />
            </StyledEl>
          </Link>
        </StyledEl> */}

      </StyledEl>

    </StyledEl>
  )
}
