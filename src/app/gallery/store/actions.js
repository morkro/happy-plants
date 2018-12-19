import { updatePlant } from '@/store/actions/plants'

export const updateGallery = (...args) =>
  updatePlant('UPDATE_GALLERY', ...args)
