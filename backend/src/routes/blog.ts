import { PrismaClient } from "@prisma/client/edge"
import { Hono } from "hono"
import { verify } from "hono/jwt"
import { blogPostObject, blogUpdateObject } from "@deepshah.dev/medium-common"
import { withAccelerate } from "@prisma/extension-accelerate"

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const jwtTokenString = c.req.header('Authorization')
    const jwtToken = jwtTokenString && jwtTokenString.split(' ').length > 1 ? jwtTokenString.split(' ')[1] : null
    if (!jwtToken) {
        c.status(403)
        return c.json({ message: 'Unauthorized' })
    }

    try {
        const user = await verify(jwtToken, c.env.JWT_SECRET)
        if (!user) {
            c.status(403)
            return c.json({ message: 'Unauthorized' })
        }
        c.set('userId', user.id)
        await next()
    } catch (error) {
        c.status(403)
        return c.json({ message: 'Unauthorized' })
    }
})

blogRouter.post('/', async (c) => {
    const prismaClient = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId = c.get('userId')
    const reqBody = await c.req.json()
    const { success } = blogPostObject.safeParse(reqBody)
    if (!success) {
        c.status(400)
        return c.json({ message: 'Bad Request' })
    }

    try {
        const blog = await prismaClient.blog.create({
            data: {
                title: reqBody.title,
                content: reqBody.content,
                authorId: userId,
                published: false,
            }
        })   
        c.status(200)
        return c.json({ id: blog.id, message: 'Blog created successfully' })
    } catch (error) {
        c.status(403)
        return c.json({ message: error })
    }
})

blogRouter.put('/', async (c) => {
    const prismaClient = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const reqBody = await c.req.json()

    const { success } = blogUpdateObject.safeParse(reqBody)
    if (!success) {
        c.status(400)
        return c.json({ message: 'Bad Request' })
    }

    try {
        const blog = await prismaClient.blog.update({
            where: {
                id: reqBody.id
            },
            data: {
                title: reqBody.title,
                content: reqBody.content,
            }
        })
        c.status(200)
        return c.json({
            id: blog.id,
            message: 'Blog updated successfully'
        })
    } catch (error) {
        c.status(403)
        return c.json({ message: 'No such blog' })
    }
})

blogRouter.get('/bulk', async (c) => {
    console.log('bulk called')
    const prismaClient = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        console.log("UserId", c.get('userId'))
        const blogs = await prismaClient.blog.findMany({
            where: {
                authorId: c.get('userId')
            }
        })
        c.status(200)
        return c.json(blogs)
    } catch (error) {
        c.status(403)
        return c.json({ message: error })
    }
})


blogRouter.get('/:id', async (c) => {
    const prismaClient = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prismaClient.blog.findUnique({
            where: {
                id: c.req.param('id')
            }
        })
        if (!blog) {
            c.status(403)
            return c.json({ message: 'No such blog' })
        }
        c.status(200)
        return c.json(blog)
    } catch (error) {
        c.status(403)
        return c.json({ message: error })
    }
})

export default blogRouter
