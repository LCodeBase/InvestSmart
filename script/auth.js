// Add this for registration
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    try {
      const auth = firebase.auth();
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await user.updateProfile({
        displayName: username,
      });
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred during registration");
    }
  });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const auth = firebase.auth();
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    alert("Login realizado com sucesso!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message || "Ocorreu um erro durante o login");
  }
});

// Listen for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("login-button").style.display = "none";
    document.getElementById("profile-icon").style.display = "block";
  } else {
    document.getElementById("login-button").style.display = "block";
    document.getElementById("profile-icon").style.display = "none";
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
