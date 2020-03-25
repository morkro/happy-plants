import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import config from './config'
import verify from './modules/verify'

export default async function server(): Promise<void> {
  const app = express()

  app.use(express.json())
  app.use(helmet())
  app.use(compression())

  app.post(verify.endpoint, verify.method)

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}.`)
  })
}
