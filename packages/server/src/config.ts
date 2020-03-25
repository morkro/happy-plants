export interface AppConfig {
  port: number
  firebase: {
    serviceAccountToken: string
    databaseURL: string
  }
}

const config: AppConfig = {
  port: 3000,
  firebase: {
    serviceAccountToken: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    databaseURL: 'https://happy-plants-app.firebaseio.com',
  },
}

export default config
