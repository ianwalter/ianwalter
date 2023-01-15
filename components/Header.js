import Link from 'next/link'
import { GrGithub } from 'react-icons/gr'
import { StyledEl } from '@generates/swag'

export default function Header () {
  return (
    <StyledEl css={{ display: 'flex', alignItems: 'center' }}>

      <Link href="/">
        <h1
          className="font-bold text-emerald-200 text-2xl my-4"
        >
          Ian Walter
        </h1>
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
