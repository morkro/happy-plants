import PlantsList from './PlantsList'
import AddPlant from './AddPlant'
import PlantView from './PlantView'

export default [
  {
    path: '/',
    name: 'PlantsList',
    component: PlantsList
  },
  {
    path: '/plant/add',
    name: 'AddPlant',
    component: AddPlant
  },
  {
    path: '/plant/:id',
    name: 'PlantView',
    component: PlantView
  }
]
