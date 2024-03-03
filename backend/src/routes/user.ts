import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { sign } from "hono/jwt"
import { signInObject, signUpObject } from "@deepshah.dev/medium-common"

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const prismaClient = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const reqBody = await c.req.json()
    const { success } = signUpObject.safeParse(reqBody)
    if (!success) {
        console.log(reqBody, success)
        c.status(403)
        return c.json({
            message: "Bad Request",
        })
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                password: reqBody.password,
            }
        })
        const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET)
        c.status(201)
        return c.json({
            jwtToken,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        })
    } catch (error: any) {
        c.status(403)
        // console.log(error)
        return c.json({
            message: error.message,
        })
    }
})

userRouter.post('/signin', async (c) => {
    const prismaClient = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const reqBody = await c.req.json()
    const { success } = signInObject.safeParse(reqBody)
    if (!success) {
        c.status(403)
        return c.json({
            message: "Bad Request",
        })
    }

    const existingUser = await prismaClient.user.findFirst({ 
        where: {
            email: reqBody.email,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        }
    })

    if (!existingUser) {
        c.status(403)
        return c.json({
            message: "No such user",
        })
    }

    await sign({ id: existingUser.id }, c.env.JWT_SECRET)
})

export default userRouter