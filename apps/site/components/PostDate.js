const options = { dateStyle: 'long', timeZone: 'America/New_York' }

export default function PostDate ({ date }) {
  const estDate = new Date(`${date}T00:00:00-05:00`)
  return (
    <time
      className="text-zinc-400 text-[1rem]"
      dateTime={date}
    >
      {estDate.toLocaleDateString('en-US', options)}
    </time>
  )
}
