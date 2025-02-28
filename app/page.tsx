import prisma from '@/lib/prisma' // Import the Prisma Client
import Link from 'next/link'

export default async function Page() {
  const posts = await prisma.post.findMany() // Query the `Post` model for all posts

  // Display the posts on the homepage
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="max-w-2xl space-y-4 mb-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className="hover:underline">
              <span className="font-semibold">{post.title}</span>
              <span className="text-sm ml-2">by {post.authorId}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/posts/create"
        className="inline-block border-2 border-current text-current px-4 py-2 rounded-lg hover:scale-[0.98] transition-all"
      >
        Create New Post
      </Link>
    </div>
  )
}
