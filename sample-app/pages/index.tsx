import { Link } from '@mui/material'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../lib/context'

const Home: NextPage = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
  }, [user])

  return (
    <>
      こんにちは {user?.username} さん！
    </>
  )
}

export default Home
