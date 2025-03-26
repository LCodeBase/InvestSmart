(function () {
  // Initialize with your PUBLIC KEY
  emailjs.init("Ky9Ld4clBOC4toKR5");

  const newsletterForm = document.querySelector(".form-sub form");

  const emailTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo à nossa Newsletter!</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #fff; color: #333; margin: 0; padding: 0; }
      .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
      .header { text-align: center; padding: 20px; background-color: #28a745; color: #fff; border-radius: 8px 8px 0 0; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { padding: 20px; background-color: #fff; border-radius: 0 0 8px 8px; color: #333; }
      .content p { font-size: 16px; line-height: 1.6; }

      /* Ajustando o botão */
      .cta-button {
        display: block;
        width: fit-content;
        margin: 20px auto 0;
        padding: 12px 30px;
        background-color: #28a745;
        color: #fff;
        font-size: 18px;
        text-align: center;
        border-radius: 50px;
        text-decoration: none;
        transition: background-color 0.3s ease, transform 0.3s ease;
      }

      .cta-button:hover {
        background-color: #218838;
        transform: translateY(-3px);
      }

      .footer { text-align: center; padding: 10px; background-color: #f4f4f4; color: #333; font-size: 14px; border-radius: 0 0 8px 8px; }
      .footer a { color: #28a745; text-decoration: none; margin-left: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Bem-vindo à nossa Newsletter!</h1>
      </div>
      <div class="content">
        <p>Olá,</p>
        <p>Ficamos muito felizes em saber que você se inscreveu em nossa newsletter!</p>
        <p>A partir de agora, todos os dias, você receberá um e-mail com os conteúdos mais recentes e exclusivos para você. Estamos ansiosos para compartilhar nossas atualizações, novidades e muito mais!</p>
        <p>Fique tranquilo, garantimos que seus dados estão seguros conosco e você pode cancelar a inscrição a qualquer momento.</p>
        <a href="#" class="cta-button">Acessar Conteúdos Exclusivos</a>
      </div>
      <div class="footer">
        <p>Atenciosamente,</p>
        <p>Equipe InvestSavy</p>
        <p>Se não deseja mais receber nossos e-mails, <a href="#">clique aqui</a> para cancelar a inscrição.</p>
      </div>
    </div>
  </body>
</html>
 `;

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted"); // Debug log

    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    console.log("Email:", email); // Debug log

    // Template parameters
    const templateParams = {
      to_email: email,
      to_name: email.split("@")[0], // Use email username as name
      from_name: "InvestSavy",
      message: "Bem-vindo à nossa newsletter!",
    };

    // Send email using EmailJS
    emailjs
      .send(
        "service_woisfjt", // Your SERVICE ID from EmailJS
        "template_lruy89m", // Your TEMPLATE ID from EmailJS
        templateParams
      )
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Inscrição realizada com sucesso! Verifique seu email.");
        emailInput.value = "";
      })
      .catch(function (error) {
        console.error("FAILED...", error);
        alert("Erro ao processar inscrição. Tente novamente.");
      });
  });
})();
