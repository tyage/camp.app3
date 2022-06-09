import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { resetPassword } from '../lib/api'
import { Button, Box, TextField, Typography } from '@mui/material'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const token = router.query.token?.toString() || ""
    const { success } = await resetPassword(token, password)
    if (success) {
      toast.success('パスワードが変更されました')
      router.push('/login')
    } else {
      toast.error('パスワードの変更に失敗しました')
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">パスワードを変更</Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="新しいパスワード"
          type="password"
          onChange={
            (e) => setPassword(e.target.value)
          } />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          パスワードを変更
        </Button>
      </Box>
    </>
  )
}

export default ResetPassword
