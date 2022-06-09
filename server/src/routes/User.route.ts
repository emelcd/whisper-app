import { Router } from 'express'
import * as userController from '../controllers/User.controller'
import { extractUser } from '../middlewares/Jwt.middleware'

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/map', extractUser, userController.mappedUsers)

export default userRouter
