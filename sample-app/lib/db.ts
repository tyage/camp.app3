import mysql from 'mysql2/promise'

let cachedConnection: mysql.Connection;

export async function getConnection(): Promise<mysql.Connection> {
  if (cachedConnection) {
    return cachedConnection;
  }
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })

  cachedConnection = connection

  return connection
}

