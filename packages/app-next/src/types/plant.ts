import { PlantModule } from './modules'

export interface PlantTag {
  created: number
  guid: string
  label: string
  modified: number
  name: string
  plants: string[]
}

export interface PlantType {
  label: string
  value: string
  guid: string
}

export interface Plant {
  blob: Blob | null
  type: PlantType | null
  created: number
  guid: string
  imageURL: string | null
  modified: number
  modules: PlantModule[]
  name: string
  tags?: PlantTag[]
}
