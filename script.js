// ----------------- FIREBASE CONFIG -----------------
const firebaseConfig = {
  apiKey: "AIzaSyAhPNlJxxQ1L0sVaQH1mYudKHV8SonFA2k",
  authDomain: "fraud-bank-apks.firebaseapp.com",
  projectId: "fraud-bank-apks",
  storageBucket: "fraud-bank-apks.firebasestorage.app",
  messagingSenderId: "255515194045",
  appId: "1:255515194045:web:308affe512983bee00bdd4",
  measurementId: "G-HE60ESN20Q"
};

// Initialize Firebase + Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ----------------- EMAILJS INIT -----------------
(function () {
  emailjs.init("zyHvnLVvEd574Iipe"); // ✅ your EmailJS Public Key
})();

async function sendMail() {
  const name = document.getElementById("name").value.trim();
  const fromEmail = document.getElementById("fromEmail").value.trim();
  const message = document.getElementById("message").value.trim();
  const statusEl = document.getElementById("status");

  // -------- Validation --------
  if (!name || !fromEmail || !message) {
    statusEl.textContent = "⚠️ Please fill all fields.";
    statusEl.style.color = "red";
    return;
  }

  // -------- Save to Firestore --------
  try {
    const contactData = {
      name: name,
      email: fromEmail,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("contactMessages").add(contactData);
    console.log("✅ Contact message saved to Firestore");
  } catch (firestoreError) {
    console.error("❌ Firestore Error:", firestoreError);
    statusEl.textContent = "⚠️ Firestore error: Could not save message.";
    statusEl.style.color = "orange";
  }

  // -------- Send Email via EmailJS --------
  const templateParams = {
    from_name: name,
    from_email: fromEmail,   // sender’s email
    to_email: "YOUR_DEFAULT_EMAIL@example.com", // 👈 replace with fixed recipient
    message: message
  };

  emailjs.send("service_egdu5og", "template_bi79cx6", templateParams)
    .then(function (response) {
      console.log("✅ EmailJS Success:", response);
      statusEl.textContent = "✅ Email sent & message saved!";
      statusEl.style.color = "green";

      // Clear form fields after successful send
      document.getElementById("name").value = "";
      document.getElementById("fromEmail").value = "";
      document.getElementById("message").value = "";
    }, function (error) {
      console.error("❌ EmailJS Error:", error);
      statusEl.textContent = "❌ Failed to send email.";
      statusEl.style.color = "red";
    });
}

