import { Request, Response, NextFunction } from 'express'
import { getPlantCollection } from '@/services/firebase'

async function getAllPlants(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const plants: FirebaseFirestore.DocumentData[] = []
  const userID = response.locals.user

  try {
    const snapshot = await getPlantCollection(userID).get()

    for (const doc of snapshot.docs) {
      const plant = await getPlantCollection(userID).doc(doc.id).get()
      plants.push(plant.data())
    }

    response.send(plants)
  } catch (error) {
    next(error)
  }
}

export default {
  endpoint: '/api/plants',
  method: getAllPlants,
}
