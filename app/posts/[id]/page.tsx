import { Suspense } from 'react'
import PostContent from './post-content'

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p>Loading post...</p>}>
      <PostContent params={params} />
    </Suspense>
  )
}
