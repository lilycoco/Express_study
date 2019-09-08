import { Request, Response, Application } from 'express'
import passport from 'passport'

export default (app: Application) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (_req: Request, res: Response) => {
      res.redirect('/surveys')
    },
  )

  app.get('/api/logout', (req: Request, res: Response) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/current_user', (req: Request, res: Response) => {
    res.send(req.user)
  })
}
