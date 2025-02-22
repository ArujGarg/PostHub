import { z } from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    name: z.string()
})

export const signinInput = z.object({
    email: z.string().optional(),
    username: z.string().optional(),
    password: z.string().min(6)
}).refine(data => data.username || data.email, {
    message: "Email or username required",
    path: ['email']
})

export const createPostInput = z.object({
    content: z.string().max(400),
})

export const updatePostInput = z.object({
    content: z.string().max(400),
    id: z.number()
})



export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreatePostInput = z.infer<typeof createPostInput>
export type UpdatePostInput = z.infer<typeof updatePostInput>
