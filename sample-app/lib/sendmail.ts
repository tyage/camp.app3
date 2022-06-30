import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { MessagesSendResult } from 'mailgun.js/interfaces/Messages'
import sendgrid, { ClientResponse } from '@sendgrid/mail'

export async function sendMailWithSendgrid(to: string, subject: string, text: string): Promise<[ClientResponse, {}]> {
  const API_KEY = process.env.SENDGRID_API_KEY || ""
  sendgrid.setApiKey(API_KEY)

  return await sendgrid.send({
    to,
    from: 'Yurucamp app <namatyage@gmail.com>',
    subject,
    text,
    html: text
  })
}

const mailgun = new Mailgun(formData)

export async function sendMailWithMailgun(to: string, subject: string, text: string): Promise<MessagesSendResult> {
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