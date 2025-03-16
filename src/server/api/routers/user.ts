import { createElysiaRouter } from "../root";

export const userRouter = createElysiaRouter({ prefix: '/user' })
  .get('/me', async ({ ctx: { session } }) => {
    return session
  })
  .patch('/add-quick-access', async () => {
    return 'Add Quick Access'
   })
