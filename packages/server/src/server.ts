import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as Sentry from '@sentry/node'
import config from './config'
import { verifyAuth } from './modules/auth'
import health from './modules/health'
import { getAllPlants } from './modules/plants'

export default async function server(): Promise<void> {
  const app = express()

  app.use(Sentry.Handlers.requestHandler() as express.RequestHandler)

  // It's important to have controllers before Sentry errorHandler
  app.get(health.endpoint, health.method)
  app.get(getAllPlants.endpoint, verifyAuth, getAllPlants.method)

  app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler)
  app.use(express.json())
  app.use(helmet())
  app.use(cookieParser())
  app.use(compression())
  app.use(cors())

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}.`)
  })
}
