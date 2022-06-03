export type SignupRequestBody = {
  email: string,
  username: string,
  password: string
}
export type SignupResult = {
  success: boolean
}

export type LoginRequestBody = {
  email: string,
  password: string
}
export type LoginResult = {
  success: boolean,
  message?: string
}

export type ResetPasswordRequestBody = {
  email: string
}
export type ResetPasswordResult = {
}
