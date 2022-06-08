import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { resetPassword } from '../lib/api'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const token = router.query.token?.toString() || ""
    const { success } = await resetPassword(token, password)
    if (success) {
      toast.success('パスワードが変更されました')
      router.push('/')
    } else {
      toast.success('パスワードの変更に失敗しました')
    }
  }

  return (
    <div>
      <main>
        <h2>パスワードを変更</h2>

        <form onSubmit={handleSubmit}>
          新しいパスワード:
          <input type="text" name="password" value={password} onChange={
            (e) => setPassword(e.target.value)
          } />
          <button>パスワードを変更</button>
        </form>
      </main>
    </div>
  )
}

export default ResetPassword
