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


// When a user is created, register them with Stripe connect
exports.AddUserdetailsInFirestore = functions.auth.user().onCreate(async (user) => {
    return admin.firestore().collection('users').doc(user.uid).set({profileImage: "https://firebasestorage.googleapis.com/v0/b/ziplinks-c8231.appspot.com/o/profileNotSet_200x200.png?alt=media&token=230f8b72-af01-4548-839e-e49c42a2778d", timeStamp: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

  });

 