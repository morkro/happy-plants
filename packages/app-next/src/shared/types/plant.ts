import { firebase } from '@/services/firebase'

export interface Plant {
  guid: string
  created: DateConstructor
  modified: DateConstructor
}
