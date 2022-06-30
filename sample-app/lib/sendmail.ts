import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { MessagesSendResult } from 'mailgun.js/interfaces/Messages'
import sendgrid, { ClientResponse } from '@sendgrid/mail'
import Mailjet from 'node-mailjet'
import { IAPIResponse } from 'node-mailjet/declarations/types/api/Response'
import { TRequestData } from 'node-mailjet/declarations/request/IRequest'

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE
})
export async function sendMailViaMailjet(to: string, subject: string, text: string): Promise<IAPIResponse<TRequestData>> {
  return await mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: { Email: 'namatyage@gmail.com' },
          To: [{ Email: to }],
          Subject: subject,
          TextPart: text
        }
      ]
    })
}

export async function sendMailViaSendgrid(to: string, subject: string, text: string): Promise<[ClientResponse, {}]> {
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
export async function sendMailViaMailgun(to: string, subject: string, text: string): Promise<MessagesSendResult> {
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