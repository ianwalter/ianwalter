import Link from 'next/link'
import clsx from 'clsx'
import { SiGithub, SiMastodon } from 'react-icons/si'
import transitionStyles from '../styles/transitionStyles.js'

export default function Header () {
  return (
    <div className="flex items-center">

      <Link href="/">
        <h1 className="font-bold text-emerald-200 text-2xl my-4">
          Ian Walter
        </h1>
      </Link>

      <div className="flex items-center ml-auto text-slate-300">

        <Link
          href="https://github.com/ianwalter"
          aria-label="GitHub"
          className={clsx(transitionStyles, 'hover:text-slate-400')}
        >
          <SiGithub style={{ display: 'block' }} />
        </Link>

        <Link
          href="https://mas.to/@ianwalter"
          aria-label="Mastodon"
          className={clsx(transitionStyles, 'hover:text-slate-400 ml-6')}
        >
          <SiMastodon style={{ display: 'block' }} />
        </Link>

      </div>

    </div>
  )
}
