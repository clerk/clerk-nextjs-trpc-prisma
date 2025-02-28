import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { postRouter } from '@/app/server/routers/posts'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: postRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
