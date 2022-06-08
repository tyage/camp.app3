import { RowDataPacket } from "mysql2"

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
  message?: string,
  user?: UserModel
}

export type ForgetPasswordRequestBody = {
  email: string
}
export type ForgetPasswordResult = {
}

export type ResetPasswordRequestBody = {
  token: string,
  newPassword: string
}
export type ResetPasswordResult = {
  success: boolean
}

export interface UserContextProps {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}
export type UserModel = {
  id: number,
  email: string,
  username: string
}

export interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  username: string;
  password_hash: string;
}
export interface PasswordResetRow extends RowDataPacket {
  id: number;
  user_id: number;
  token: string;
}