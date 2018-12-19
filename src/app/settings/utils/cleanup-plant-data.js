import { isBlobbable } from '@/utils/blob'

export default function cleanUpPlantData (oldData) {
  const copy = oldData

  if (copy.categories) {
    delete copy.categories
  }

  if (!isBlobbable(copy.blob)) {
    copy.blob = null
  }

  if (!Array.isArray(copy.tags)) {
    copy.tags = []
  }

  return copy
}
