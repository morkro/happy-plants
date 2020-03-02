export function getGalleryStructure (id = null) {
  return {
    list: [],
    guid: id
  }
}

export function getGalleryItemStructure () {
  return {
    blob: undefined,
    created: 0,
    fileName: '',
    guid: undefined,
    imageURL: ''
  }
}
