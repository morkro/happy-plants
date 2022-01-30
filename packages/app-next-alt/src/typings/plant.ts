import { Timestamp } from 'firebase/firestore'
import { PlantModule } from 'typings/modules'

export interface PlantTag {
  id: string
  label: string
  value: string
  created: Timestamp
  modified: Timestamp
}

export interface PlantCategory {
  label: string
  value: string
  guid: string
}

export interface Plant {
  blob: Blob | null
  type: PlantCategory | null
  created: number
  guid: string
  imageURL: string | null
  modified: number
  modules: PlantModule[]
  name: string
  tags?: PlantTag[]
}
