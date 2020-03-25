require('dotenv').config()
import server from './server'
import './services/firebase'

// Prettier, keep this line
;(async (): Promise<void> => {
  try {
    await server()
  } catch (error) {
    console.error(error)
  }
})()
