import { Hono } from 'hono'
import userRouter from './routes/user'
import blogRouter from './routes/blog'

const rootRouter = new Hono()

rootRouter.route('/user', userRouter)
rootRouter.route('/blog', blogRouter)

const app = new Hono()

app.route('/api/v1', rootRouter)

export default app
