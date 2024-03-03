import zod from "zod"

export const signUpObject = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

export type SignUpObject = zod.infer<typeof signUpObject>


export const signInObject = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
})

export type SignInObject = zod.infer<typeof signInObject>


export const blogPostObject = zod.object({
    title: zod.string(),
    content: zod.string().min(8)
})

export type BlogPostObject = zod.infer<typeof blogPostObject>

export const blogUpdateObject = zod.object({
    title: zod.string(),
    content: zod.string().min(8),
    id: zod.string()
})

export type BlogUpdateObject = zod.infer<typeof blogUpdateObject>
