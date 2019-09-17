import { Request, Response, Application } from 'express'
import * as _ from 'lodash'
import Path from 'path-parser'
import { URL } from 'url'
import requireCredits from '../middlewares/requireCredits'
import requireLogin from '../middlewares/requireLogin'
import Mailer from '../services/Mailer'
import surveyTemplate from '../services/emailTemplates/surveyTemplate'
import mongoose from 'mongoose'

export default (app: Application) => {
  const Survey = mongoose.model('surveys')

  app.get('/api/surveys', requireLogin, async (req: any, res: Response) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    })
    res.send(surveys)
  })

  app.get('/api/surveys/:surveyId/:choice', (_req: Request, res: Response) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhooks', (req: Request, res: Response) => {
    const p = new Path('/api/surveys/:surveyId/:choice') //https://liaergliknkasdfa.localtunnel.me/api/surveys/webhooks
    _.chain(req.body)
      .map(({ email, url }: any) => {
        const match: any = p.test(new URL(url).pathname)
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact()
      // .uniqBy('email', 'surveyId')
      .uniqBy('email')
      .each(({ surveyId, email, choice }: any) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          },
        ).exec()
      })
      .value()

    res.send({})
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req: any, res: Response) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email: any) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    })
    const mailer = await Mailer(survey, surveyTemplate(survey))

    try {
      await mailer.send()
      await survey.save()
      req.user.credits += 1
      const user = await req.user.save()
      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
