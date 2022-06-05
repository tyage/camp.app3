import { FieldPacket, RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../lib/db';
import { sendMail } from '../../lib/sendmail';
import { ResetPasswordRequestBody, ResetPasswordResult, User } from '../../lib/types'
import { createPasswordResetToken } from '../../lib/user';

interface ResetPasswordNextApiRequest extends NextApiRequest {
  body: ResetPasswordRequestBody
}

export default async function handler(
  req: ResetPasswordNextApiRequest,
  res: NextApiResponse<ResetPasswordResult>
) {
  const { email } = req.body
  try {
    const connection = await getConnection()
    const [rows] = await connection.query<User[]>(
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

    // send reset password email
    const mailTitle = 'Hi'
    const mailBody = `Please access to http://localhost:8000/reset-password?token=${token}`
    sendMail(email, mailTitle, mailBody)

    return res.status(200).json({})
  } catch (e) {
    console.error(e)
    res.status(500).json({})
  }
}
