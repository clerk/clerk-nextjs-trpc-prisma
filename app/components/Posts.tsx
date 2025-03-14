'use client'

import Link from 'next/link'
import { trpc } from '../_trpc/client'

export default function Posts() {
  // Use the `getPosts` query from the TRPC client
  const getPosts = trpc.getPosts.useQuery()
  const { isLoading, data } = getPosts

  return (
    <div className="mb-8 flex max-w-2xl flex-col space-y-4">
      {isLoading && <div>Loading...</div>}
      {data?.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="hover:bg-neutral-100 dark:hover:bg-neutral-800 flex flex-col rounded-lg px-2 py-4 transition-all hover:underline"
        >
          <span className="text-lg font-semibold">{post.title}</span>
          <span className="text-sm">by {post.authorId}</span>
        </Link>
      ))}
    </div>
  )
}
