import { LoginRequestBody, LoginResult, ForgetPasswordRequestBody, ForgetPasswordResult, SignupRequestBody, SignupResult, ResetPasswordResult, ResetPasswordRequestBody } from "./types"

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

export async function sendForgetPasswordMail(email: string): Promise<ForgetPasswordResult> {
  const data: ForgetPasswordRequestBody = { email }
  const response = await fetch('/api/forget-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function resetPassword(token: string, newPassword: string): Promise<ResetPasswordResult> {
  const data: ResetPasswordRequestBody = { token, newPassword }
  const response = await fetch('/api/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return await response.json()
}
