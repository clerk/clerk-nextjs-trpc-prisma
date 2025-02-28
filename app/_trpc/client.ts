'use client'

import { createTRPCReact } from '@trpc/react-query'

import type { PostRouter } from '@/app/server/routers/posts'

export const trpc = createTRPCReact<PostRouter>({})
