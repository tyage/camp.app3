import { createHash, randomUUID } from "crypto"

export function hashPassword(password: string): string {
  return createHash('sha256').update(password, 'utf8').digest('hex')
}

export function createPasswordResetToken(): string {
  return randomUUID()
}