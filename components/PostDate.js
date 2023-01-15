import { format } from 'date-fns'

export default function PostDate ({ date }) {
  return (
    <time
      className="text-zinc-400 text-[1rem]"
      dateTime={date}
    >
      {format(new Date(date), 'MMMM d, yyyy')}
    </time>
  )
}
