import { UserModel } from '../models/User.model'

interface IJWTToken {
  email: string;
  exp: number;
  iat: number;
}

export async function extractEmail (token: IJWTToken) {
  return await UserModel.findOne({ email: token.email })
}
