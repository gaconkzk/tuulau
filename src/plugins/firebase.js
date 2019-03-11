import firebase from 'firebase'

import('firebase/auth')
import('firebase/database')
// import('firebase/firestore')
import('firebase/storage')
// import('firebase/functions')

const config = {
  "apiKey": process.env.GOOGLE_FIREBASE_API_KEY,
  "databaseURL": process.env.FIREBASE_CONFIG.databaseURL,
  "storageBucket": process.env.FIREBASE_CONFIG.storageBucket,
  "projectId": process.env.FIREBASE_CONFIG.projectId,
  "authDomain": process.env.GOOGLE_FIREBASE_AUTH_DOMAIN,
  "messagingSenderId": process.env.GOOGLE_FIREBASE_AUTH_MSG_SENDER_ID
}

firebase.initializeApp(config)
