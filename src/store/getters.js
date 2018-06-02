export default {
  getAllTags: state => {
    // @TODO A tad too complex. Make it simpler.
    // - loops over all plants and only returns the tag;
    // - filters out every undefined, etc. occurance;
    // - flattens array;
    // - counts every occurance;
    // - the result is passed to a Set() and turned into an Array.

    return Array.from(new Set(state.plants
      .map(plant => plant.tags)
      .filter(tag => tag)
      .reduce((acc, el) => acc.concat(el), [])
      .map((tag, index, origin) => {
        let count = 0
        for (const _tag of origin) {
          if (_tag.label === tag.label) {
            count += 1
          }
        }
        return { ...tag, count }
      })
    ))
  }
}
