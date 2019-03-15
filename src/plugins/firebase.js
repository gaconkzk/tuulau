import firebase from 'firebase/app'
import('firebase/auth')
import('firebase/database')
// import('firebase/firestore')
import('firebase/storage')
// import('firebase/functions')

import config from './gool_keys.json'
const app = firebase.initializeApp(config)

export default app

