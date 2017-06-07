import { getAllPlants as getAllPlantsFromAPI } from '@/api/plants'

export const getAllPlants = () => {
  return getAllPlantsFromAPI()
}
