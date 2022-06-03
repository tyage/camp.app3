import { SignupRequestBody, SignupResult } from "./types"

export async function signup(email: string, username: string, password: string): Promise<SignupResult> {
  const data: SignupRequestBody = { email, username, password }
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}