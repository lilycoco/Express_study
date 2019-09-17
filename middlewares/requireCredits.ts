import { NextFunction, Response } from 'express'

export default (req: any, res: Response, next: NextFunction) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits!' })
  }
  next()
}
