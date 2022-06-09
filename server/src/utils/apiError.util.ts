import { Response } from 'express'
export class ApiError extends Error {
  status: number
  constructor (message: string, status: number) {
    super(message)
    this.status = status
    this.message = message
  }

  showError () {
    return {
      message: this.message,
      status: this.status
    }
  }
}

export const handleApiError = (error: ApiError | unknown, res: Response) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      msg: error.message
    })
  } else {
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
}
