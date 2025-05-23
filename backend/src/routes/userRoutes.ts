import { Hono } from "hono";

import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@arujgarg/posthub-common";
import { PrismaClient } from "@prisma/client/extension";
import prisma from "../lib/prisma";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
  
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "wrong inputs"
    })
  }
  
  //add zod validation, hash the password.
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        username: body.username,
        password: body.password
      }
    })
    const jwt = await sign({
      id: user.id,
      email: user.email
    }, c.env.JWT_SECRET)

    return c.text(jwt)

  } catch (error) {
    c.status(411);
    console.log(error)
    return c.text("could not sign up")
  }
})
  
userRouter.post('/signin', async (c) => {

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "wrong inputs"
    })
  }
  
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{
          username: body.username,
          password: body.password
        }, {
          email: body.email,
          password: body.password
        }]
      }
    })

    if(!user){
      c.status(403); //unauthorized status code
      return c.text("incorrect credentials");
    }
    const jwt = await sign({
      id: user.id,
      email: user.email
    }, c.env.JWT_SECRET)

    return c.text(jwt);

  } catch (error) {
    c.status(411);
    console.log(error)
    return c.text("error while signing in");
  }
})



userRouter.get('/search', async (c) => {

  const query = c.req.query('query') || ""
  if(!query) return c.json([]);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            startsWith: query,
            mode: "insensitive"
          }
        },
        {
          name: {
            startsWith: query,
            mode: "insensitive"
          }
        }
      ]
    },
    select: {
      profilePic: true,
      username: true,
      name: true
    },
    take: 10,
    skip: 0
  })
  console.log("users", users);

  return c.json(users);


})







userRouter.get("/:username", async (c) => {
  const username = c.req.param("username");

  const user = await prisma.user.findUnique({
      where:{
          username: username
      },
      select:{
          id: true
      }
  })

  if(!user) return c.json({message: "user not found"})

  try {
      
  const userPosts = await prisma.post.findMany({
      where: {
          authorId: user.id
      },
      select: {
          content: true,
          updatedAt: true,
          createdAt: true,
          likeCount: true,
          commentCount: true,
          authorId: true,
          id: true,
          likes: {
              where: {
                  userId: user.id
              },
              select: {
                  id: true
              }
          },
          author: {
             select: {
              name: true,
              username: true,
              profilePic: true
             }
          }
      }
  })

  if(!userPosts) return c.json({message: "user posts not found"})

  return c.json({userPosts})

  } catch (error) {
      console.log("error fetching userPosts", error);
      return c.json({message: "server error"})
  }

})

userRouter.get("/profile/:id", async (c) => {
  const userId = c.req.param("id");

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId)
      },
      select: {
        username: true,
        name: true,
        email: true
      }
    })
    return c.json({
      user
    })

  } catch (error) {
    console.log("error fetching user details", error);
    return c.json({message: "error fetching user"})
  }

})