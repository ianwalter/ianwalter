import Link from 'next/link'
import clsx from 'clsx'
import linkStyle from '../styles/linkStyle.js'

export default function LatestPosts (props) {
  return (
    <div className="mt-12">

      <h2 className="text-3xl font-semibold">
        My latest posts 💬
      </h2>

      <ul className="pl-5 my-6 list-disc">
        {props.posts && props.posts.map(post => (
          <li key={post.url} className="my-1">
            <Link href={post.url} className={clsx(linkStyle, 'font-medium')}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  )
}
