import * as admin from 'firebase-admin'
import { Request, Response, NextFunction } from 'express'

export async function verifyAuth(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (request.headers.authorization) {
    console.log(request.headers)
    try {
      const decoded = await admin.auth().verifyIdToken(request.headers.authorization)
      response.locals.user = decoded.uid
      next()
    } catch (error) {
      console.error(error)
      response.status(403).send('Unauthorised')
    }
  } else {
    response.status(403).send('Unauthorised')
  }
}
