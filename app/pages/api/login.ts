import { RowDataPacket } from 'mysql2'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../lib/db'
import { LoginRequestBody, LoginResult, UserRow } from '../../lib/types'
import { hashPassword } from '../../lib/user'

interface LoginNextApiRequest extends NextApiRequest {
  body: LoginRequestBody
}

export default async function handler(
  req: LoginNextApiRequest,
  res: NextApiResponse<LoginResult>
) {
  const { email, password } = req.body
  const passwordHash = hashPassword(password)
  try {
    const connection = await getConnection()
    const [rows] = await connection.query<UserRow[]>(
      'SELECT * FROM `users` WHERE email = ? AND password_hash = ?',
      [email, passwordHash]
    )
    if (rows.length === 1) {
      const user = rows[0]
      res.status(200).json({
        success: true,
        message: 'Hi!',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      })
    } else {
      res.status(401).json({ success: false, message: 'Wrong password' })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}
