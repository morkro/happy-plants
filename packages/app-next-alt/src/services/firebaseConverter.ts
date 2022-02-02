import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'
import typesData from 'data/types'
import hasOwn from 'utilities/hasOwn'
import { Plant, PlantTag } from 'typings/plant'

function toDateNumber(time: number | Timestamp) {
  // We now store dates as a Timestamp and need to convert it
  return typeof time === 'number' ? time : time?.toMillis()
}

export const plantConverter = {
  toFirestore(data: Plant): DocumentData {
    return {
      name: data.name,
      type: data?.type?.id ?? null,
      imageURL: data?.imageURL ?? null,
      tags: data?.tags ?? null,
      modules: data?.modules ?? null,
      created: Timestamp.fromMillis(data?.created),
      modified: Timestamp.fromMillis(data?.created),
    }
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions): Plant {
    const data = snapshot.data(options)
    const plant: Plant = {
      // This is required for legacy implementations.
      id: hasOwn(data, 'guid') ? data.guid : snapshot.id,
      name: data?.name,
      type: typesData.find((c) => c.id === data?.type),
      imageURL: data?.imageURL,
      tags: data?.tags,
      modules: data?.modules,
      created: toDateNumber(data?.created),
      modified: toDateNumber(data?.modified),
    }
    return plant
  },
}

export const tagConverter = {
  // Apparently this is only called when adding, not when updating
  toFirestore(data: PlantTag): DocumentData {
    return {
      label: data.label,
      value: data.value,
      created: Timestamp.fromMillis(data.created),
      modified: Timestamp.fromMillis(Date.now()),
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): PlantTag {
    const data = snapshot.data(options)
    const tag: PlantTag = {
      id: snapshot.id,
      label: data?.label,
      value: data?.value,
      created: toDateNumber(data?.created),
      modified: toDateNumber(data?.modified),
    }
    return tag
  },
}
