function sendNewsletter(e) {
  e.preventDefault();

  const email = document.getElementById("newsletter-email").value;

  // Send email using EmailJS
  emailjs
    .send(
      "service_at26rze", // Replace with your EmailJS service ID
      "template_fhojz9z", // Replace with your EmailJS template ID
      {
        to_email: email,
        // Add any other template parameters you want to send
      }
    )
    .then(
      function (response) {
        alert("Inscrição realizada com sucesso!");
        document.getElementById("newsletter-form").reset();
      },
      function (error) {
        alert("Erro ao se inscrever. Por favor, tente novamente.");
        console.error("Error:", error);
      }
    );
}
