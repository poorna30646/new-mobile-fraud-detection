(function() {
  emailjs.init("zyHvnLVvEd574Iipe"); // Replace with your EmailJS Public Key
})();

async function sendMail() {
  const name = document.getElementById("name").value;
  const fromEmail = document.getElementById("fromEmail").value;  // user's email
  const message = document.getElementById("message").value;
  const statusEl = document.getElementById("status");

  if (!name || !fromEmail || !message) {
    statusEl.textContent = "⚠️ Please fill all fields.";
    statusEl.style.color = "red";
    return;
  }

  // Save to Firestore
  try {
    const contactData = {
      name: name,
      email: fromEmail,
      message: message,
      timestamp: new Date()
    };
    
    // Save to Firestore collection "contactMessages"
    await db.collection("contactMessages").add(contactData);
    console.log("Contact message saved to Firestore");
  } catch (firestoreError) {
    console.error("Error saving to Firestore:", firestoreError);
    statusEl.textContent = "⚠️ Message saved locally but Firestore error occurred";
    statusEl.style.color = "orange";
  }

  const templateParams = {
    from_name: name,
    from_email: fromEmail,   // sender's email
    to_email: "YOUR_DEFAULT_EMAIL@example.com",  // 👈 fixed recipient
    message: message
  };

  emailjs.send("service_egdu5og", "template_bi79cx6", templateParams)
    .then(function(response) {
      statusEl.textContent = "✅ Email sent successfully and message saved!";
      statusEl.style.color = "green";
    }, function(error) {
      statusEl.textContent = "❌ Failed to send email: " + error.text;
      statusEl.style.color = "red";
    });
}
