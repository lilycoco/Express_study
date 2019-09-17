import { NextFunction, Response } from 'express'

export default (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' })
  }
  next()
}
