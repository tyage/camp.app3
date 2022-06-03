import mysql from 'mysql2'
import { delBasePath } from 'next/dist/shared/lib/router/router'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})
connection.connect((error) => {
  console.error(error)
})

export { connection }
