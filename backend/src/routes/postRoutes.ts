import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        authorId: string
    }
}>();

postRouter.use('/*', async (c, next) => {
    //this middleware should extract the authorid from the jwt and pass it down to the route handler
    const authHeader = await c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set("authorId", user.id as string);
        await next();
    }
    else{
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
})

  
postRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const authorId = c.get("authorId");

    const post = await prisma.post.create({
        data: {
            content: body.content,
            authorId: Number(authorId)
        }  
    })
    if(post){
        post.published = true;
    }
    return c.json(post)
    
})

postRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            content: body.content,
            published: true
        }
    }) 
    return c.json(post)
})

//add pagination here
postRouter.get('/home', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany();
    return c.json({
        posts   
    })
})


postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param('id');
    const post = await prisma.post.findFirst({
        where: {
            id: Number(id)
        }
    })
    return c.json(post);
})


