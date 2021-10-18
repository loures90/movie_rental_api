import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import { testConnection } from './infra/connection'
import { userRouter } from './routes/users/user'
import { moviesRouter } from './routes/movies/movies'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/movies', moviesRouter)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo
      console.log(`Server is running in http://localhost:${address.port}`)
    } else {
      console.error('Failure upon starting server.')
    }
  })
  
  export default app

testConnection()