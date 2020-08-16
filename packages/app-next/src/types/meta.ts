import { DeviceInfo } from '@/utils/getDeviceInfo'

export interface BugReport {
  created: number
  modified: number
  reportedBy: {
    userID: string
    email: string
  }
  description: string
  screenshot?: null | File
  appVersion: string
  deviceInfo: DeviceInfo
}
