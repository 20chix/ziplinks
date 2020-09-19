import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions


// firebase init goes here
const config = {
    apiKey: "AIzaSyCzV4UQkP3DoF6aDUDmA5ahWOv23wKaMJU",
    authDomain: "glanceprofile.firebaseapp.com",
    databaseURL: "https://glanceprofile.firebaseio.com",
    projectId: "glanceprofile",
    storageBucket: "glanceprofile.appspot.com",
    messagingSenderId: "369000783162",
    appId: "1:369000783162:web:81da8073d60b0218e24403",
    measurementId: "G-240844L6G2"
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
    firebase
   
}