import { PlantTag } from './plant'

export enum FirestoreCollections {
  Users = 'users',
  Plants = 'plants',
  Tags = 'tags',
  BugReports = 'bugReports',
  FeatureRequests = 'featureRequests',
}

export type FirestoreLoginProvider = 'email' | 'google' | 'github' | 'twitter'

export interface FirestoreUserDocument {
  tags: PlantTag[]
}
