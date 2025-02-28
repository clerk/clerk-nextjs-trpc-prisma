'use client'

import { redirect } from 'next/navigation'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { trpc } from '@/app/_trpc/client'
import { useState } from 'react'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // Use Clerk's `useAuth()` hook to get the user's ID
  const { userId, isLoaded } = useAuth()
  // Use the `createPosts` mutation from the TRPC client
  const createPostMutation = trpc.createPosts.useMutation()

  // Check if Clerk is loaded
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
        <div>Loading...</div>
      </div>
    )
  }

  // Protect this page from unauthenticated users
  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-4">
        <p>You must be signed in to create a post.</p>
        <SignInButton>
          <button
            type="submit"
            className="inline-block border-2 border-current text-current px-4 py-2 rounded-lg hover:scale-[0.98] transition-all cursor-pointer"
          >
            Sign in
          </button>
        </SignInButton>
      </div>
    )
  }

  // Handle form submission
  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    createPostMutation.mutate({
      title,
      content,
      authorId: userId as string,
    })

    redirect('/')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={6}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="inline-block border-2 border-current text-current px-4 py-2 rounded-lg hover:scale-[0.98] transition-all w-full"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}
