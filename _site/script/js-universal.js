document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // Previne que o click se propague
    navMenu.classList.toggle("active");
  });

  // Fechar menu ao clicar fora
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });

  // Prevenir que cliques dentro do menu fechem ele
  navMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
