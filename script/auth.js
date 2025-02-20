document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message || "An error occurred during login");
  }
});

// Add this for registration
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
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
