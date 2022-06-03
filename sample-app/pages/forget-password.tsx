import type { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { sendResetPasswordMail } from '../lib/api'

const ForgetPassword: NextPage = () => {
  const [email, setEmail] = useState("")

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    sendResetPasswordMail(email)
  }

  return (
    <div>
      <main>
        <h2>パスワードを忘れた方</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="email" value={email} onChange={changeEmail} />
          <button>パスワードリセットメールを送信</button>
        </form>
      </main>
    </div>
  )
}

export default ForgetPassword
