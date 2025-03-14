'use client'
import { trpc } from '@/app/_trpc/client'
import { use } from 'react'

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  // Params are wrapped in a promise, so we need to unwrap them using React's `use()` hook
  const { id } = use(params)
  // Use the `getPost` query from the TRPC client
  const { data: post, isLoading } = trpc.getPost.useQuery({ id })

  return (
    <div className="flex min-h-screen flex-col max-w-2xl mx-auto mt-8">
      {isLoading && <p>Loading...</p>}
      {!isLoading && !post && <p>No post found.</p>}
      {!isLoading && post && (
        <article className="w-full max-w-2xl">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">{post.title}</h1>
          <p className="text-sm sm:text-base">by {post.authorId}</p>
          <div className="prose prose-gray prose-sm sm:prose-base lg:prose-lg mt-4 sm:mt-8">
            {post.content || 'No content available.'}
          </div>
        </article>
      )}
    </div>
  )
}
