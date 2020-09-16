// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


// When a user is created, register them with Stripe connect
exports.AddUserdetailsInFirestore = functions.auth.user().onCreate(async (user) => {
    return admin.firestore().collection('users').doc(user.uid).set({email: user.email, profileImage: "https://firebasestorage.googleapis.com/v0/b/glanceprofile.appspot.com/o/profileNotSet.png?alt=media&token=8e2606ce-bfb3-454f-a2da-e88a466758a8", timeStamp: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  });

 