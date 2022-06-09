import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { MessagesSendResult } from 'mailgun.js/interfaces/Messages'

const mailgun = new Mailgun(formData)

export async function sendMail(to: string, subject: string, text: string): Promise<MessagesSendResult> {
  const domain = process.env.MAILGUN_DOMAIN || ""
  const apiKey = process.env.MAILGUN_API_KEY || ""
  const mg = mailgun.client({
    username: 'api',
    key: apiKey
  })

  return await mg.messages.create(domain, {
    from: 'Yurucamp app <me@samples.mailgun.org>',
    to,
    subject,
    text,
  })
}