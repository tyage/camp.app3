import { LoginRequestBody, LoginResult, ResetPasswordRequestBody, ResetPasswordResult, SignupRequestBody, SignupResult } from "./types"

export async function signup(email: string, username: string, password: string): Promise<SignupResult> {
  const data: SignupRequestBody = { email, username, password }
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const data: LoginRequestBody = { email, password }
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function sendResetPasswordMail(email: string): Promise<ResetPasswordResult> {
  const data: ResetPasswordRequestBody = { email }
  const response = await fetch('/api/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}
