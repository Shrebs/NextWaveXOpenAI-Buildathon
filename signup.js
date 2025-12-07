const firebaseConfig = {
  apiKey: "AIzaSyAMj10StJwOpEFMg-2LSbQRg_M8MqcgOaI",
  authDomain: "homepreneur-hub-2ec7b.firebaseapp.com",
  projectId: "homepreneur-hub-2ec7b",
  storageBucket: "homepreneur-hub-2ec7b.firebasestorage.app",
  messagingSenderId: "378384897250",
  appId: "1:378384897250:web:e2ca071b177bd926a8babb"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

document.getElementById('signupForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const phone = this.phone.value.trim();
  const businessName = this.businessName.value.trim();
  const businessDetails = this.businessDetails.value.trim();
  const location = this.location.value.trim();
  const category = Array.from(document.getElementById('businessCategories').selectedOptions).map(opt => opt.value);
  const password = this.password.value;

  const msgBox = document.getElementById('signup-msg');
  msgBox.textContent = "";

  try {
    // Check if user already exists in Firestore
    const userSnapshot = await db.collection("users").where("email", "==", email).get();
    if (!userSnapshot.empty) {
      msgBox.textContent = "An account with this email already exists. Please log in.";
      return;
    }

    // Create with Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save user data in Firestore
    await db.collection("users").doc(user.uid).set({
      name,
      email,
      phone,
      businessName,
      businessDetails,
      location,
      categories: category,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log("Firestore: User profile successfully written for UID:", user.uid);
    msgBox.textContent = "Account created! Redirecting...";
    setTimeout(() => { window.location.href = "home.html"; }, 1700);

  } catch (error) {
    msgBox.textContent = "Error: " + error.message;
    console.error("Error during signup or Firestore write:", error);
    // Additional advice for permissions error
    if (error.code && error.code.indexOf("permission-denied") !== -1) {
      msgBox.textContent += "\nPlease ensure your Firestore Database Rules allow user creation/writes!";
    }
  }
});