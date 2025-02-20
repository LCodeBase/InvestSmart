document.addEventListener("DOMContentLoaded", () => {
  // Add this for registration
  document
    .getElementById("registerForm")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      // ... existing registration code ...
    });

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    // ... existing login code ...
  });

  // Listen for authentication state changes
  firebase.auth().onAuthStateChanged((user) => {
    console.log("Auth state changed:", user); // Debugging line
    if (user) {
      const loginButton = document.getElementById("login-button");
      const profileIcon = document.getElementById("profile-icon");
      if (loginButton && profileIcon) {
        loginButton.style.display = "none";
        profileIcon.style.display = "block";
      }
    } else {
      const loginButton = document.getElementById("login-button");
      const profileIcon = document.getElementById("profile-icon");
      if (loginButton && profileIcon) {
        loginButton.style.display = "block";
        profileIcon.style.display = "none";
      }
    }
  });

  function toggleProfileMenu() {
    const menu = document.getElementById("profile-menu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  }

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  const db = firebase.firestore();

  function logUserActivity(activity) {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection("userActivities")
        .add({
          uid: user.uid,
          activity: activity,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log("Activity logged:", activity);
        })
        .catch((error) => {
          console.error("Error logging activity:", error);
        });
    }
  }

  // Example usage
  logUserActivity("User logged in");
});
