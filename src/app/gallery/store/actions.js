import { updatePlant } from '@/app/plant/store/actions/update'

export const updateGallery = (...args) =>
  updatePlant('UPDATE_MODULE_GALLERY', ...args)
