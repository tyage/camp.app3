import mailgun from 'mailgun-js'

export function sendMail(to: string, subject: string, text: string) {
  const domain = process.env.MAILGUN_DOMAIN || ""
  const apiKey = process.env.MAILGUN_API_KEY || ""
  const mg = mailgun({ apiKey, domain })

  mg.messages().send({
    from: 'Yurucamp app <me@samples.mailgun.org>',
    to,
    subject,
    text,
  }, function (error, body) {
    console.log(body)
  })
}