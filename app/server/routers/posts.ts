import { protectedProcedure, publicProcedure, router } from '../trpc'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  authorId: z.string(),
})

export const postRouter = router({
  getPost: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return await prisma.post.findUnique({
      where: { id: parseInt(input.id) },
    })
  }),
  getPosts: publicProcedure.query(async () => {
    return await prisma.post.findMany()
  }),
  // Protected procedure that requires a user to be signed in
  createPosts: protectedProcedure.input(postSchema).mutation(async ({ input }) => {
    return await prisma.post.create({
      data: {
        title: input.title,
        content: input.content,
        authorId: input.authorId,
      },
    })
  }),
})

export type PostRouter = typeof postRouter
