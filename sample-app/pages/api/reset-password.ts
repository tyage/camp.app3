import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '../../lib/db'
import { PasswordResetRow, ResetPasswordRequestBody, ResetPasswordResult } from '../../lib/types'
import { hashPassword } from '../../lib/user'

interface ResetPasswordRequest extends NextApiRequest {
  body: ResetPasswordRequestBody
}

export default async function handler(
  req: ResetPasswordRequest,
  res: NextApiResponse<ResetPasswordResult>
) {
  const { token, newPassword } = req.body
  try {
    const connection = await getConnection()
    const [rows] = await connection.query<PasswordResetRow[]>(
      'SELECT * FROM `password_resets` WHERE token = ?',
      [token]
    )
    if (rows.length === 0) {
      // 無効なトークン
      return res.status(200).json({ success: false })
    }
    const { id: passwordResetId, user_id: userId } = rows[0]

    // ユーザのパスワードを変更
    const newHashedPassword = hashPassword(newPassword)
    await connection.query(
      'UPDATE `users` SET password_hash = ? WHERE id = ?',
      [newHashedPassword, userId]
    )

    // トークンを無効化
    await connection.query(
      'DELETE FROM `password_resets` WHERE id = ?',
      [passwordResetId]
    )

    res.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}
