function sendNewsletter(e) {
  e.preventDefault()

  const email = document.getElementById('newsletter-email').value

  // Send email using EmailJS
  emailjs
    .send('service_at26rze', 'template_fhojz9z', {
      to_email: email,
      to_name: email.split('@')[0], // Gets the part before @ as name
      from_name: 'InvestSavy',
      reply_to: 'invest.smart.sup.braslandia@gmail.com',
    })
    .then(
      function (response) {
        alert('Inscrição realizada com sucesso!')
        document.getElementById('newsletter-form').reset()
      },
      function (error) {
        alert('Erro ao se inscrever. Por favor, tente novamente.')
        console.error('Error:', error)
      }
    )
}
