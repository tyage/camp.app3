import { Link } from '@mui/material'
import type { NextPage } from 'next'
import NextLink from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <nav>
        <NextLink href="/signup">
          <Link>
            ユーザ登録
          </Link>
        </NextLink>
        <NextLink href="/login">
          <Link>
            ログイン
          </Link>
        </NextLink>
      </nav>
    </>
  )
}

export default Home
