import { Response, Application } from 'express'
import keys from '../config/keys'
import Stripe from 'stripe'
const stripe = new Stripe(keys.stripeSecretKey || '')
import requireLogin from '../middlewares/requireLogin'

export default (app: Application) => {
  app.post('/api/stripe', requireLogin, async (req: any, res: Response) => {
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    })

    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
  })
}
