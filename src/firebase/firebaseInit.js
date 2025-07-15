import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyBXSN8D_dzZiHUYAwrD7SfzQxqsJCd5X6Q',
    authDomain: 'vuefireblogsab.firebaseapp.com',
    projectId: 'vuefireblogsab',
    storageBucket: 'vuefireblogsab.firebasestorage.app',
    messagingSenderId: '897014757795',
    appId: '1:897014757795:web:f50b7a38e75bb62db50216',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()
