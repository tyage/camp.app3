import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { login } from '../lib/api'

const Login: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await login(email, password)
    if (result.success) {
      router.push('/')
    }
  }

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <main>
        <h2>ログイン</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="email" value={email} onChange={changeEmail} />
          <input type="password" name="password" value={password} onChange={changePassword} />
          <button>ログイン</button>
        </form>
        <Link href="/forget-password">
          <a>パスワードを忘れた方</a>
        </Link>
      </main>
    </div>
  )
}

export default Login
