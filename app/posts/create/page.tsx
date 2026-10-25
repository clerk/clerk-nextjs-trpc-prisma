'use client'

import { useRouter } from 'next/navigation'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { trpc } from '@/app/_trpc/client'
import { useState } from 'react'

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // Check whether the user is signed in
  const { userId, isLoaded } = useAuth()
  // Use the `createPosts` mutation from the TRPC client
  const createPostMutation = trpc.createPosts.useMutation()

  // Check if Clerk is loaded
  if (!isLoaded) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4">
        <div>Loading...</div>
      </div>
    )
  }

  // Protect this page from unauthenticated users
  if (!userId) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4">
        <p>You must be signed in to create a post.</p>
        <SignInButton>
          <button
            type="submit"
            className="inline-block cursor-pointer rounded-lg border-2 border-current px-4 py-2 text-current transition-all hover:scale-[0.98]"
          >
            Sign in
          </button>
        </SignInButton>
      </div>
    )
  }

  // Handle form submission
  async function createPost(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    createPostMutation.mutate(
      {
        title,
        content,
      },
      // Go back to the posts list once the post is saved
      { onSuccess: () => router.push('/') },
    )
  }
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Post</h1>
      <form onSubmit={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block text-lg">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="content" className="mb-2 block text-lg">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={6}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="inline-block w-full rounded-lg border-2 border-current px-4 py-2 text-current transition-all hover:scale-[0.98]"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}
