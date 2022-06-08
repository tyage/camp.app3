import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <ToastContainer />
  </>
}

export default MyApp
