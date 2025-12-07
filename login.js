const firebaseConfig = {
  apiKey: "AIzaSyAMj10StJwOpEFMg-2LSbQRg_M8MqcgOaI",
  authDomain: "homepreneur-hub-2ec7b.firebaseapp.com",
  projectId: "homepreneur-hub-2ec7b",
  storageBucket: "homepreneur-hub-2ec7b.firebasestorage.app",
  messagingSenderId: "378384897250",
  appId: "1:378384897250:web:e2ca071b177bd926a8babb"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = this.email.value.trim();
  const password = this.password.value;
  const msgBox = document.getElementById('login-msg');
  msgBox.textContent = "";

  try {
    // Check if user exists in Firestore before Auth (extra check; optional)
    const userSnapshot = await db.collection("users").where("email", "==", email).get();
    if (userSnapshot.empty) {
      msgBox.textContent = "Account not created. Please sign up to create an account.";
      setTimeout(()=>{window.location.href="signup.html";},1800);
      return;
    }

    // Authenticate
    await auth.signInWithEmailAndPassword(email, password);
    msgBox.textContent = "Login successful! Redirecting...";
    setTimeout(()=>{window.location.href = "home.html";}, 1400);
  } catch (error) {
    msgBox.textContent = "Incorrect credentials or account does not exist.";
    setTimeout(()=>{window.location.href="signup.html";},2000);
  }
});