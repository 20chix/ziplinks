import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions


// firebase init goes here
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}
firebase.initializeApp(config)


// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const rdb = firebase.database()
const currentUser = auth.currentUser


// firebase collections
const usersCollection = db.collection('users')



export {
    db,
    rdb,
    auth,
    currentUser,
    storage,
    usersCollection,
   
}