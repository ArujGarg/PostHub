import { Hono } from "hono";

import { decode, sign, verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from "@arujgarg/posthub-common";
import { PrismaClient } from "@prisma/client/extension";
import prisma from "../lib/prisma";

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
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        console.log(user)
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
    } catch (error) {
        c.status(403);
        console.log("the error im getting is", error)
        return c.json({
            message: "you are not logged in"
        })
    }
})


  




postRouter.post('/', async (c) => {
    
    const body = await c.req.json();
    const authorId = c.get("authorId");
    const { success } = createPostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "wrong inputs"
        })
    }

   try {
        const post = await prisma.post.create({
            data: {
                content: body.content,
                authorId: Number(authorId)
            }, 
            include: {
                author: {
                    select: {
                        name: true,
                        username: true,
                        profilePic: true
                    }
                }
            }  
        })
        if(post){
            post.published = true;
        }
        return c.json(post)
   } catch (error) {
        console.log(error);
   }
    
})







postRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    })

    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "wrong inputs"
        })
    }

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
    const userId = c.get("authorId");

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            published: true,
            authorId: true,
            likeCount: true,
            commentCount: true,
            likes: {
                where: {
                    id: Number(userId)
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
    });

    const postsWithLikes = posts.map((post) => ({
        ...post,
        isLiked: post.likes.length > 0
    }))

    return c.json({
        posts: postsWithLikes
    })
})








postRouter.get('/:id', async (c) => {
    const userId = c.get("authorId");
    const id = c.req.param('id');
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
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
                    userId: Number(userId)
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

    if(!post){
        return c.json({message: "post not found"})
    }

    return c.json({
        post,
        isLiked: post.likes.length > 0
    });
})








postRouter.post('/:id/like', async (c) => {
    const postId = Number(c.req.param("id"));
    const userId = c.get("authorId");

    if(isNaN(postId)){
        return c.json("invalid post id")
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if(!post){
        return c.json("post not found")
    }

    const isLiked = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: Number(userId),
                postId: postId
            }
        }
    })

    if(isLiked){
        return c.json({
            message: "you already liked the post",
            likeCount: post.likeCount,
            isLiked: true
        })
    }

    await prisma.like.create({
        data: {
            userId: Number(userId),
            postId: postId
        }
    })

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likeCount: {increment: 1}
        }
    })

    return c.json({
        message: "post liked",
        likeCount: updatedPost.likeCount
    })
})








postRouter.post('/:id/unlike', async (c) => {
    const postId = Number(c.req.param("id"))
    const userId = c.get("authorId")

    if(isNaN(postId)){
        return c.json({
            message: "invalid postId"
        })
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if(!post){
        return c.json({
            message: "post not found"   
        })
    }

    const isLiked = await prisma.like.findUnique({
        where: {
            userId_postId:{
                userId: Number(userId),
                postId: postId
            }
        }
    })

    if(!isLiked){
        return c.json({
            message: "the post is not liked so cant unlike"
        })
    }

    await prisma.like.delete({
        where: {
            id: isLiked.id //isliked has the whole row of the like table 
        }
    })

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likeCount: {decrement :1}
        }
    })

    return c.json({
        message: "post unliked",
        likeCount: updatedPost.likeCount
    })
})











