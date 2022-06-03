// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Sign } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '../../lib/db';
import { SignupRequestBody, SignupResult } from '../../lib/types'

interface SignupNextApiRequest extends NextApiRequest {
  body: SignupRequestBody
}

export default async function handler(
  req: SignupNextApiRequest,
  res: NextApiResponse<SignupResult>
) {
  const { username, password } = req.body
  try {
    await connection.promise().query(
      'INSERT INTO `users` VALUES (?, ?)',
      [username, password]
    )
    res.status(200).json({ success: true })
  } catch(e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}
