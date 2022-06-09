import { model, Schema } from 'mongoose'

interface IMessage {
  _id?: Schema.Types.ObjectId;
  text: string;
  roomId: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    text: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' }
  },
  {
    timestamps: true
  }
)

const MessageModel = model<IMessage>('Message', MessageSchema)

export { MessageModel, IMessage }
