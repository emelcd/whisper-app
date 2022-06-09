import { IRoom, RoomModel } from '../models/Room.model'
import { Model, Schema } from 'mongoose'

class RoomService {
  model: Model<IRoom>
  constructor (model: Model<IRoom>) {
    this.model = model
  }

  async getRoom (id: string): Promise<IRoom | null> {
    return RoomModel.findById(id)
  }

  async getRooms (): Promise<IRoom[]> {
    return RoomModel.find()
  }

  async getRoomByName (name: string): Promise<IRoom | null> {
    return RoomModel.findOne({ name })
  }

  async createRoom (name: string, owner: Schema.Types.ObjectId): Promise<IRoom> {
    return await RoomModel.create({ name, owner })
  }

  async updateRoom (id: string, room: IRoom): Promise<IRoom | null> {
    return RoomModel.findByIdAndUpdate(id, room, { new: true })
  }

  async deleteRoom (id: string): Promise<IRoom | null> {
    return RoomModel.findByIdAndDelete(id)
  }

  async addUserToRoom (roomId: string, userId: string): Promise<IRoom | null> {
    return RoomModel.findByIdAndUpdate(
      roomId,
      { $push: { users: userId } },
      { new: true }
    )
  }

  async removeUserFromRoom (
    roomId: string,
    userId: string
  ): Promise<IRoom | null> {
    return RoomModel.findByIdAndUpdate(
      roomId,
      { $pull: { users: userId } },
      { new: true }
    )
  }

  async addMessageToRoom (
    roomId: string,
    messageId: string
  ): Promise<IRoom | null> {
    return RoomModel.findByIdAndUpdate(
      roomId,
      { $push: { messages: messageId } },
      { new: true }
    )
  }

  async removeMessageFromRoom (
    roomId: string,
    messageId: string
  ): Promise<IRoom | null> {
    return RoomModel.findByIdAndUpdate(
      roomId,
      { $pull: { messages: messageId } },
      { new: true }
    )
  }
}

const roomService = new RoomService(RoomModel)

export default roomService
