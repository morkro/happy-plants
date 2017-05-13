import PlantsList from './PlantsList'
import PlantView from './PlantView'

export default [
  {
    path: '/',
    name: 'PlantsList',
    component: PlantsList
  },
  {
    path: '/plant/:id',
    name: 'PlantView',
    component: PlantView
  }
]
