const toggleButton = document.getElementById("toggleForm");
const registerForm = document.getElementById("registerForm");

toggleButton.addEventListener("click", () => {
  if (registerForm.style.display === "none") {
    registerForm.style.display = "block";
  } else {
    registerForm.style.display = "none";
  }
});

// Selecione os elementos
const button = document.getElementById("toggleForm");
const formContainer = document.getElementById("registerForm");
const blurBackground = document.createElement("div");
blurBackground.classList.add("blur-background");

// Adicione o fundo desfocado a tela
document.body.appendChild(blurBackground);

// Evento para abrir o formulário e o fundo desfocado
button.addEventListener("click", () => {
  formContainer.style.display = "block";
  blurBackground.style.display = "block";
});

// Evento para fechar o formulário e o fundo desfocado ao clicar no fundo desfocado
blurBackground.addEventListener("click", () => {
  formContainer.style.display = "none";
  blurBackground.style.display = "none";
});

// Evento para fechar o formulário e o fundo desfocado ao clicar no botão "X"
const closeButton = document.querySelector("#close-btn");
closeButton.addEventListener("click", (event) => {
  event.preventDefault(); // Evita o comportamento padrão do botão
  formContainer.style.display = "none";
  blurBackground.style.display = "none";
});

const textarea = document.getElementById("myTextarea");
const charCount = document.getElementById("charCount");

textarea.addEventListener("input", () => {
  const remainingChars = 1000 - textarea.value.length;

  // Atualiza o contador de caracteres
  charCount.textContent = `${remainingChars} caracteres restantes`;

  // Verifica se o limite foi alcançado
  if (remainingChars < 0) {
    charCount.textContent = "Limite atingido";
  }

  // Se o limite for 0 ou menos, muda a cor do contador
  charCount.classList.toggle("red", remainingChars < 1);
});

// Calcular o tempo de postagem

document.addEventListener("DOMContentLoaded", () => {
  const updateTimes = () => {
    const now = new Date();
    document.querySelectorAll(".news-time").forEach((element) => {
      const postTime = new Date(element.getAttribute("data-post-time"));
      const diff = now - postTime;

      let timeText = "";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        timeText = `${days} dia${days > 1 ? "s" : ""} atrás`;
      } else if (hours > 0) {
        timeText = `${hours} hora${hours > 1 ? "s" : ""} atrás`;
      } else if (minutes > 0) {
        timeText = `${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;
      } else {
        timeText = `${seconds} segundo${seconds > 1 ? "s" : ""} atrás`;
      }

      element.textContent = timeText;
    });
  };

  updateTimes();
  setInterval(updateTimes, 60000); // Atualiza a cada minuto
});

// Página de notícias - InvestSmart/blogs-main.html

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-btn");
  const noticiasTab = document.getElementById("noticias-tab");
  const educacaoTab = document.getElementById("educacao-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Show/hide content based on selected tab
      if (tab.dataset.tab === "noticias") {
        noticiasTab.style.display = "block";
        educacaoTab.style.display = "none";
      } else {
        noticiasTab.style.display = "none";
        educacaoTab.style.display = "block";
      }
    });
  });
});
