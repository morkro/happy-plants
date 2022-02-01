import { useState } from 'react'
import config, { PlantOrderMap, PlantOrderType } from 'config'
import { getLocalEntry } from 'services/webStorage'

export default function useHomePreferences(): PlantOrderMap {
  const {
    localStorage: { homeOrderBy },
    ui: { plantOrderMap },
  } = config
  const [storageOrderBy] = useState<PlantOrderType>(getLocalEntry(homeOrderBy) as PlantOrderType)
  if (plantOrderMap.has(storageOrderBy)) {
    return plantOrderMap.get(storageOrderBy) as PlantOrderMap
  }
  return plantOrderMap.get(PlantOrderType.Latest) as PlantOrderMap
}
