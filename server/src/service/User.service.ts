import { IUser, UserModel } from '../models/User.model'
import { Model } from 'mongoose'

class UserService {
  model: Model<IUser>
  constructor (model: Model<IUser>) {
    this.model = model
  }

  async getUser (id: string): Promise<IUser | null> {
    return await UserModel.findById(id)
  }

  async getUsers (): Promise<IUser[]> {
    return await UserModel.find()
  }

  async getUserByUsername (username: string): Promise<IUser | null> {
    return await UserModel.findOne({ username })
  }

  async getUserByEmail (email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email })
  }

  async createUser (user: IUser): Promise<IUser> {
    return await UserModel.create(user)
  }

  async updateUser (id: string, user: IUser): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true })
  }

  async deleteUser (id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id)
  }
}

const userService = new UserService(UserModel)

export default userService
