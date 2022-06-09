import { Router } from 'express'
import * as roomController from '../controllers/Room.controller'
import { extractUser } from '../middlewares/Jwt.middleware'

const roomRouter = Router()

roomRouter.post('/create', extractUser, roomController.createRoom)
roomRouter.post('/add-user', extractUser, roomController.addUserToRoom)

export default roomRouter
