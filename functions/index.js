const admin = require("firebase-admin");
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: serviceAccount.project_id,
//     clientEmail: serviceAccount.client_email,
//     privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
//   }),
// });

// firebase emulators:start --only functions

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.getData = functions.https.onCall((data, context) => {
//   return `Hello, ${data.collection}`
// });

exports.createUser = functions.https.onCall((data, context) => {
  if (context.auth.token.isAdmin !== true && context.auth.token.accessLevel > 2) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Denied! Only high-level Admins can create new users"
    );
  }

  return (
    admin
      .auth()
      .createUser({
        email: data.email,
        password: data.password,
        uid: data.id,
        displayName:
          data.first_name
            .toUpperCase()
            .normalize("NFD")
            .replace(
              /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
              "$1"
            )
            .normalize() +
          " " +
          data.last_name
            .toUpperCase()
            .normalize("NFD")
            .replace(
              /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
              "$1"
            )
            .normalize(),
        emailVerified: true,
      })
      .then((user) => {
        admin.auth().setCustomUserClaims(user.uid, { isAdmin: data.isAdmin, accessLevel: data.access_level });
      })
      .catch((error) => { 
        throw new functions.https.HttpsError(
          "failed-precondition",
          error.message
        );
      })    
  );
});



exports.addUserToDB = functions.https.onCall((data, context) => {
  if (context.auth.token.isAdmin !== true && context.auth.token.accessLevel > 2) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Denied! Only high-level Admins can add new users to the database"
    );
  }

  return (
    admin
      .firestore()
      .collection("users")
      .doc(data.id)
      .create({
        firstName: data.first_name
          .toUpperCase()
          .normalize("NFD")
          .replace(
            /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
            "$1"
          )
          .normalize(),
        lastName: data.last_name
          .toUpperCase()
          .normalize("NFD")
          .replace(
            /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
            "$1"
          )
          .normalize(),
        id: data.id,
        email: data.email,
        dateOfBirth: new Date(`${data.date_of_birth} GMT-0500`),
        createdOn: new Date() ,
        role: data.isAdmin ? "ADMIN" : "USER",
        accessLevel: data.isAdmin ? data.access_level : "N/A"
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
          "failed-precondition",
          error.message
        );
      })
  )
})
