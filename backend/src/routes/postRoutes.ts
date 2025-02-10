import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();


postRouter.get('/home', (c) => {
    return c.text('Hello Hono!')
  })
  
postRouter.post('/', (c) => {
return c.text('Hello Hono!')
})

postRouter.put('/', (c) => {
return c.text('Hello Hono!')
})

postRouter.get('/:id', (c) => {
return c.text('Hello Hono!')
})

postRouter.get('/', (c) => {
return c.text('Hello Hono!')
})

