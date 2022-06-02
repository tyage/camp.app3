import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sample App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav>
          <Link href="/signup">
            <a>ユーザ登録</a>
          </Link>
          <Link href="/login">
            <a>ログイン</a>
          </Link>
        </nav>
      </main>
    </div>
  )
}

export default Home
