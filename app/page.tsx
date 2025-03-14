import Link from 'next/link'
import Posts from './components/Posts'

export default async function Page() {
  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold">Posts</h1>
      <Posts />
      <Link
        href="/posts/create"
        className="inline-block rounded-lg border-2 border-current px-4 py-2 text-current transition-all hover:scale-[0.98]"
      >
        Create New Post
      </Link>
    </div>
  )
}
