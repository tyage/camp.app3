import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../lib/db'
import { sendMailWithSendgrid } from '../../lib/sendmail'
import { ForgetPasswordRequestBody, ForgetPasswordResult, UserRow } from '../../lib/types'
import { createPasswordResetToken } from '../../lib/user'

interface ForgetPasswordNextApiRequest extends NextApiRequest {
  body: ForgetPasswordRequestBody
}

export default async function handler(
  req: ForgetPasswordNextApiRequest,
  res: NextApiResponse<ForgetPasswordResult>
) {
  const { email } = req.body
  try {
    const connection = await getConnection()
    const [rows] = await connection.query<UserRow[]>(
      'SELECT * FROM `users` WHERE email = ?',
      [email]
    )
    if (rows.length === 0) {
      return res.status(200).json({})
    }
    const user = rows[0]

    // create reset token and save it with user id
    const token = createPasswordResetToken()
    await connection.query(
      'INSERT INTO `password_resets` (user_id, token) VALUES (?, ?)',
      [user.id, token]
    )
    const passwordResetURL = `${process.env.APP_BASE_URL}/reset-password?token=${token}`

    // send reset password email
    const mailTitle = 'パスワードリセット'
    const mailBody = `パスワードをリセットするには下記URLにアクセスしてください。 ${passwordResetURL}`
    const result = await sendMailWithSendgrid(email, mailTitle, mailBody)

    return res.status(200).json({})
  } catch (e) {
    console.error(e)
    res.status(500).json({})
  }
}
