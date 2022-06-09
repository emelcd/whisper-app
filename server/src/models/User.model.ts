import { model, Schema } from 'mongoose'

interface IUser {
  _id: Schema.Types.ObjectId;
  username: string;
  password: string;
  email: string;
  roomId: Schema.Types.ObjectId;
  friends: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

const UserModel = model<IUser>('User', UserSchema)

export { UserModel, IUser }
