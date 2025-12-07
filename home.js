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

const categoryMap = {
  "Food services": "users-food",
  "Tailoring": "users-tailoring",
  "Tutoring": "users-tutoring",
  "Beauty and wellness": "users-beauty",
  "Arts & craft": "users-arts"
};

function createUserCard(user) {
  return `
    <div class="user-card">
      <strong>${user.name}</strong> - <span>${user.businessName}</span>
      <div>${user.businessDetails}</div>
      <span class="user-location">${user.location}</span>
    </div>
  `;
}

async function displayUsersByCategory() {
  try {
    const snapshot = await db.collection("users").get();
    Object.values(categoryMap).forEach(id => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = ""; // clear
    });
    snapshot.forEach(doc => {
      const user = doc.data();
      if (!user.categories || !Array.isArray(user.categories)) return;
      user.categories.forEach(cat => {
        const divId = categoryMap[cat];
        if (divId) {
          const container = document.getElementById(divId);
          if (container) container.innerHTML += createUserCard(user);
        }
      });
    });
  } catch (err) {
    console.error("Error loading users:", err);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  displayUsersByCategory();
});