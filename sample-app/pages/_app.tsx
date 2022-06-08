import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { Container, CssBaseline, Box } from '@mui/material'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Sample App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <CssBaseline />
        <Component {...pageProps} />
      </Box>
    </Container>
    <ToastContainer />
  </>
}

export default MyApp
