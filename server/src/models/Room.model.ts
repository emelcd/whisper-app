import { model, Schema } from 'mongoose'

interface IRoom {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  users: Schema.Types.ObjectId[];
  owner: Schema.Types.ObjectId;
  admins: Schema.Types.ObjectId[];
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    description: { type: String },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    admins: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
  },
  {
    timestamps: true
  }
)

const RoomModel = model<IRoom>('Room', RoomSchema)

export { RoomModel, IRoom }
