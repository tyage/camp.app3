import { SignupResult } from "./types"

export async function signup(username: string, password: string): Promise<SignupResult> {
  const data = { username, password }
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}