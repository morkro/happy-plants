import { DeviceInfo } from 'utilities/getDeviceInfo'

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
