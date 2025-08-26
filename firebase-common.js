// firebase-common.js

const firebaseConfig = {
  apiKey: "AIzaSyAhPNlJxxQ1L0sVaQH1mYudKHV8SonFA2k",
  authDomain: "fraud-bank-apks.firebaseapp.com",
  projectId: "fraud-bank-apks",
  storageBucket: "fraud-bank-apks.firebasestorage.app",
  messagingSenderId: "255515194045",
  appId: "1:255515194045:web:308affe512983bee00bdd4",
  measurementId: "G-HE60ESN20Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore
const db = firebase.firestore();

// Save result
async function saveAnalysisResult(data) {
  try {
    const docRef = await db.collection("analyses").add(data);
    return docRef.id;
  } catch (err) {
    console.error("Error saving analysis result:", err);
    return null;
  }
}

// Report fraudulent APK
async function reportFraudulentAPK(data) {
  try {
    const docRef = await db.collection("fraudReports").add(data);
    return docRef.id;
  } catch (err) {
    console.error("Error reporting fraudulent APK:", err);
    return null;
  }
}
