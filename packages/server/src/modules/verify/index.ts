import * as admin from 'firebase-admin'
import { Request } from 'express'

async function verifyUser(request: Request): Promise<string> {
  const { token } = request.body
  const decoded = await admin.auth().verifyIdToken(token)
  return decoded.uid
}

export default {
  endpoint: '/verify',
  method: verifyUser,
}
