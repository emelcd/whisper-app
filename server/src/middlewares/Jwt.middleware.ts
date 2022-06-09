import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret'

const extractUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.body.token = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
}

export { extractUser }
