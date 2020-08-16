import { downloadFile } from '@/services/firebase'
import { Plant } from '@/types/plant'

interface WorkerEvent extends MessageEvent {
  data: Plant
}

const context: Worker = self as any // eslint-disable-line

context.addEventListener('message', async (event: WorkerEvent) => {
  try {
    const imageURL = await downloadFile(event.data.imageURL)
    context.postMessage({ imageURL, guid: event.data.guid })
  } catch (error) {
    context.postMessage({ error: true, message: error.message, guid: event.data.guid })
  }
})
