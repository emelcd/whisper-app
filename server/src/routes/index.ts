import { Router } from 'express'
import userRouter from './User.route'
import roomRouter from './Room.rooute'
import messageRouter from './Message.route'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/room', roomRouter)
apiRouter.use('/msg', messageRouter)

export default apiRouter
