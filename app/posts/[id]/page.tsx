import { Suspense } from 'react'
import PostContent from './post-content'

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="flex min-h-screen w-full flex-col max-w-2xl mx-auto mt-8">
      <Suspense fallback={<p>Loading...</p>}>
        <PostContent params={params} />
      </Suspense>
    </div>
  )
}
