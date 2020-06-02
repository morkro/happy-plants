export enum ModuleTypes {
  gallery = 'gallery',
  watering = 'watering',
}

export interface WateringModule {
  amount: number
  frequency: string
}

export interface GalleryModule {
  list: string[]
}

type PlantModuleValues = WateringModule | GalleryModule

export interface PlantModule {
  type: ModuleTypes
  value: PlantModuleValues
}
