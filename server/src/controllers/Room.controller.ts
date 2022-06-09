import { Request, Response } from 'express'
import userService from '../service/User.service'
import { RoomModel } from '../models/Room.model'
import { handleApiError, ApiError } from '../utils/apiError.util'

async function createRoom (req: Request, res: Response) {
  try {
    const { name, token } = req.body
    const user = await userService.getUserByEmail(token.email)
    if (!user) throw new ApiError('User does not exist', 400)
    const room = await RoomModel.create({
      name,
      owner: user._id,
      users: [user._id]
    })
    await room.save()

    return res.status(201).json(room)
  } catch (error) {
    handleApiError(error, res)
  }
}

async function addUserToRoom (req: Request, res: Response) {
  try {
    const { roomId, token } = req.body
    const user = await userService.getUserByEmail(token.email)
    if (!user) throw new ApiError('User does not exist', 400)
    const room = await RoomModel.findById(roomId)
    if (!room) throw new ApiError('Room does not exist', 400)
    if (room.users.includes(user._id)) {
      throw new ApiError('User already in room', 400)
    }
    room.users.push(user._id)
    await room.save()

    return res.status(201).json(room)
  } catch (error) {
    handleApiError(error, res)
  }
}

export { createRoom, addUserToRoom }
