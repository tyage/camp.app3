import type { NextPage } from 'next'

const ForgetPassword: NextPage = () => {
  return (
    <div>
      <main>
        <h2>パスワードを忘れた方</h2>
        
        <form>
          <input type="email" />
          <button>パスワードリセットメールを送信</button>
        </form>
      </main>
    </div>
  )
}

export default ForgetPassword
