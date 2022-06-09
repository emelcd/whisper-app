import { Router } from 'express'
import * as messageController from '../controllers/Message.controller'
import { extractUser } from '../middlewares/Jwt.middleware'

const messageRouter = Router()

messageRouter.post('/add', extractUser, messageController.addMessage)
messageRouter.get('/:roomId', extractUser, messageController.getRoomsMessages)

export default messageRouter
