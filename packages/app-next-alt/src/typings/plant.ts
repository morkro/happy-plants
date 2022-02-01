import { DocumentReference, Timestamp } from 'firebase/firestore'
import { PlantModule } from 'typings/modules'

export interface PlantTag {
  id: string
  label: string
  value: string
  created: number
  modified: number
}

export interface PlantCategory {
  label: string
  value: string
  id: string
}

interface PlantConstructor {
  name: string
  imageURL?: string
  type?: PlantCategory
  modules?: PlantModule[]
}

export interface PlantFirestore extends PlantConstructor {
  created: Timestamp
  modified: Timestamp
  tags?: DocumentReference<PlantTag>[]
}

export interface Plant extends PlantConstructor {
  id: string
  tags?: DocumentReference<PlantTag>[]
  created: number
  modified: number
  // FIXME: below
  [key: string]: any
}
