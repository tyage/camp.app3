// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '../../lib/db';
import { SignupRequestBody, SignupResult } from '../../lib/types'
import { hashPassword } from '../../lib/user';

interface SignupNextApiRequest extends NextApiRequest {
  body: SignupRequestBody
}

export default async function handler(
  req: SignupNextApiRequest,
  res: NextApiResponse<SignupResult>
) {
  const { email, username, password } = req.body
  const passwordHash = hashPassword(password)
  try {
    await connection.promise().query(
      'INSERT INTO `users` (email, username, password_hash) VALUES (?, ?, ?)',
      [email, username, passwordHash]
    )
    res.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}
