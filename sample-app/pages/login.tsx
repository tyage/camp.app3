import type { NextPage } from 'next'
import Link from 'next/link'

const Login: NextPage = () => {
  return (
    <div>
      <main>
        <h2>ログイン</h2>
        
        <form>
          <input type="text" />
          <input type="password" />
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
