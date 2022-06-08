import { Box, Button, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { sendForgetPasswordMail } from '../lib/api'

const ForgetPassword: NextPage = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await sendForgetPasswordMail(email)
    toast('パスワードリセットメールを送信しました')
  }

  return (
    <>
      <Typography component="h1" variant="h5">パスワードを忘れた方</Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="メールアドレス"
          type="text"
          onChange={
            (e) => setEmail(e.target.value)
          } />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          パスワードリセットメールを送信
        </Button>
      </Box>
    </>
  )
}

export default ForgetPassword
