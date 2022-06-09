import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { createServer } from 'http'
import { Server } from 'socket.io'
import apiRouter from './routes'
import { UserModel } from './models/User.model'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

const server = createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', async (socket) => {
  console.log('a user connected')
  const users = await UserModel.find()
  socket.emit('users', users.flat())
  console.log(users)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

export { app, server, io }
