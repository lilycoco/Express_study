import sendgrid, { mail as helper } from 'sendgrid'
import keys from '../config/keys'

export default async ({ subject, recipients }: any, content: any) => {
  const sgApi = sendgrid(keys.sendGridKey || '')
  const fromEmail = new helper.Email('no-reply@emaily.com')
  const toEmail = formatAddresses(recipients)
  const body = new helper.Content('text/html', content)
  const mail = new helper.Mail(fromEmail, subject, toEmail[0], body)

  console.log(toEmail)

  function formatAddresses(re: any) {
    return re.map(({ email }: any) => {
      return new helper.Email(email)
    })
  }

  const addClickTracking = () => {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)
    trackingSettings.setClickTracking(clickTracking)
    mail.addTrackingSettings(trackingSettings)
  }

  const addRecipients = () => {
    const personalize = new helper.Personalization()
    toEmail.forEach((recipient: any) => {
      personalize.addTo(recipient)
    })
    mail.addPersonalization(personalize)
  }

  const send = async () => {
    addClickTracking()
    addRecipients()

    try {
      const request = sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      })
      const response = await sgApi.API(request)
      return response
    } catch (err) {
      console.log(err)
    }
  }

  return { send }
}
