'use client'

import Link from 'next/link'
import { trpc } from '../_trpc/client'

export default function Posts() {
  // Use the `getPosts` query from the TRPC client
  const getPosts = trpc.getPosts.useQuery()
  const { isLoading, data } = getPosts

  return (
    <ul className="max-w-2xl space-y-4 mb-8">
      {isLoading && <div>Loading...</div>}
      {data?.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`} className="hover:underline">
            <span className="font-semibold">{post.title}</span>
            <span className="text-sm ml-2">by {post.authorId}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
