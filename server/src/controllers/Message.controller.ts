import { Request, Response } from 'express'
import { MessageModel } from '../models/Message.model'
import { RoomModel } from '../models/Room.model'
import { ApiError, handleApiError } from '../utils/apiError.util'
import { extractEmail } from '../utils/extractUser.util'

const addMessage = async (req: Request, res: Response) => {
  try {
    const user = await extractEmail(req.body.token)
    if (!user) throw new ApiError('User does not exist', 400)
    const { text, roomId } = req.body
    const room = await RoomModel.findById(roomId)
    if (!room) throw new ApiError('Room does not exist', 400)
    const message = await MessageModel.create({
      text,
      owner: user._id,
      roomId
    })
    await message.save()
    return res.status(201).json(message)
  } catch (error) {
    handleApiError(error, res)
  }
}

const getRoomsMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params
    const room = await RoomModel.findById(roomId)
    if (!room) throw new ApiError('Room does not exist', 400)
    const messages = await MessageModel.find({ roomId })
    const parsedMessages = messages.map((message) => {
      return {
        text: message.text,
        owner: message.owner,
        updatedAt: message.updatedAt
      }
    })

    return res.status(200).json(parsedMessages)
  } catch (error) {
    handleApiError(error, res)
  }
}

export { addMessage, getRoomsMessages }
