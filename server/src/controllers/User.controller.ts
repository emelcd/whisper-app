import userService from '../service/User.service'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import { UserModel } from '../models/User.model'

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret'

async function register (req: Request, res: Response) {
  try {
    /* Check if user exists */
    const { username, password, email } = req.body
    const user = await userService.getUserByEmail(email)
    if (user) {
      return res.status(400).json({
        error: 'User already exists'
      })
    }
    /* Create user */
    const newUser = await UserModel.create({
      username,
      password: CryptoJS.SHA256(password).toString(),
      email
    })
    const token = jwt.sign(
      {
        email: newUser.email
      },
      JWT_SECRET,
      { expiresIn: '72h' }
    )
    await newUser.save()
    return res.status(201).json({ token })
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
}

async function login (req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)
    if (!user) {
      return res.status(400).json({
        error: 'User does not exist'
      })
    }
    if (user.password !== CryptoJS.SHA256(password).toString()) {
      return res.status(400).json({
        error: 'Incorrect password'
      })
    }
    const token = jwt.sign(
      {
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '72h' }
    )
    return res.status(200).json({
      token
    })
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
}

async function mappedUsers (req: Request, res: Response) {
  try {
    const users = await UserModel.find()
    const parsedUser = users.map((user) => {
      return {
        username: user.username,
        _id: user._id
      }
    })
    return res.status(200).json(parsedUser)
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
}

export { register, login, mappedUsers }
