function saveToFile(event) {
  event.preventDefault();

  const formData = {
    nome: document.querySelector('input[name="nome"]').value,
    sobrenome: document.querySelector('input[name="sobrenome"]').value,
    email: document.querySelector('input[name="email"]').value,
    mensagem: document.querySelector('textarea[name="mensagem"]').value,
  };

  fetch("php/save_contact.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        document.getElementById("contactForm").reset();
        document.getElementById("registerForm").style.display = "none";
      } else {
        throw new Error(data.message || "Erro desconhecido");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao enviar mensagem: " + error.message);
    });
}
