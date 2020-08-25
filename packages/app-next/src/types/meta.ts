import { DeviceInfo } from '@/utils/getDeviceInfo'

export interface BugReport {
  created: number
  modified: number
  reportedBy: {
    userId: string
    email: string
  }
  description: string
  screenshot?: null | File
  appVersion: string
  deviceInfo: DeviceInfo
}

export interface FeatureRequest {
  created: number
  modified: number
  reportedBy: {
    userId: string
    email: string
  }
  appVersion: string
  deviceInfo: DeviceInfo
  description: string
}
