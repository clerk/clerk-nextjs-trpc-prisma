'use client'

import { trpc } from '@/app/_trpc/client'
import { use } from 'react'

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  // Params are wrapped in a promise, so we need to unwrap them using React's `use()` hook
  const unwrappedParams = use(params)
  const { id } = unwrappedParams
  // Use the `getPost` query from the TRPC client
  const post = trpc.getPost.useQuery({ id })

  if (!post.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
        <div>No post found.</div>
      </div>
    )
  }

  const { title, authorId, content } = post.data

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      {post && (
        <article className="w-full max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 ">{title}</h1>
          <p className="text-sm sm:text-base">by {authorId}</p>
          <div className="prose prose-gray prose-sm sm:prose-base lg:prose-lg mt-4 sm:mt-8">
            {content || 'No content available.'}
          </div>
        </article>
      )}
    </div>
  )
}
