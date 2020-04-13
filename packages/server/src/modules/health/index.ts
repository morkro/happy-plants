import { Request, Response } from 'express'

function healthCheck(request: Request, response: Response): void {
  try {
    response.send({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    })
  } catch (error) {
    response.status(503).send(error)
  }
}

export default {
  endpoint: '/.health',
  method: healthCheck,
}
