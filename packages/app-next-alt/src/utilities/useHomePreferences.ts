import { useEffect, useState } from 'react'
import config, { HomeOrderMap, HomeOrderBy, HomeViewmode, HomeFilterBy } from 'config'
import { getLocalEntry, setLocalEntry } from 'services/webStorage'

const {
  localStorage: { homeOrderBy, homeViewmode, homeFilterBy },
  ui: { homeOrderMap },
} = config

export function useHomePreferences() {
  const [orderBy, setOrderBy] = useState<HomeOrderBy>(
    (getLocalEntry(homeOrderBy) as HomeOrderBy) || HomeOrderBy.Latest
  )
  const [viewmode, setViewmode] = useState<HomeViewmode>(
    (getLocalEntry(homeViewmode) as HomeViewmode) || HomeViewmode.Grid
  )
  const [filterBy, setFilterBy] = useState<HomeFilterBy>(
    (getLocalEntry(homeFilterBy) as HomeFilterBy) || HomeFilterBy.Tags
  )

  useEffect(() => {
    if (getLocalEntry(homeOrderBy) !== orderBy) {
      setLocalEntry(homeOrderBy, orderBy)
    }
    if (getLocalEntry(homeViewmode) !== viewmode) {
      setLocalEntry(homeViewmode, viewmode)
    }
    if (getLocalEntry(homeFilterBy) !== filterBy) {
      setLocalEntry(homeFilterBy, filterBy)
    }
  }, [orderBy, viewmode, filterBy])

  return {
    orderBy: { value: orderBy, set: setOrderBy },
    viewmode: { value: viewmode, set: setViewmode },
    filterBy: { value: filterBy, set: setFilterBy },
  }
}

export function useHomeOrderMap(): HomeOrderMap {
  const [storageOrderBy] = useState<HomeOrderBy>(getLocalEntry(homeOrderBy) as HomeOrderBy)
  if (homeOrderMap.has(storageOrderBy)) {
    return homeOrderMap.get(storageOrderBy) as HomeOrderMap
  }
  return homeOrderMap.get(HomeOrderBy.Latest) as HomeOrderMap
}
