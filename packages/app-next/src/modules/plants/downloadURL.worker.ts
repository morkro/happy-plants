import firebase, { downloadFile } from '@/services/firebase'
import { Plant } from '@/types/plant'

const context: Worker = self as any // eslint-disable-line

// Authenticate in new context, otherwise no permissions granted.
firebase.auth()

context.addEventListener('message', async (event: MessageEvent & { data: Plant }) => {
  try {
    const imageURL = await downloadFile(event.data.imageURL)
    context.postMessage({ imageURL, guid: event.data.guid })
  } catch (error) {
    context.postMessage({ error: true, message: error.message, guid: event.data.guid })
  }
})
