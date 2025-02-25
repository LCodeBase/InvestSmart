document.addEventListener("DOMContentLoaded", function () {
  const postTimeElements = document.querySelectorAll(".news-time");
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

  postTimeElements.forEach((element) => {
    const dataString = element.getAttribute("data-post-time");
    const postTime = new Date(dataString);
    const now = new Date();

    // Certifique-se de que o horário está no mesmo fuso horário
    // Ajuste 'now' para o mesmo fuso horário da data da postagem
    const utcOffset = now.getTimezoneOffset() * 60000; // em milissegundos
    const adjustedNow = new Date(now.getTime() + utcOffset);

    // Calcula a diferença em segundos
    let diffInSeconds = Math.floor((adjustedNow - postTime) / 1000);

    let value, unit;
    if (Math.abs(diffInSeconds) < 60) {
      value = diffInSeconds;
      unit = "second";
    } else if (Math.abs(diffInSeconds) < 3600) {
      value = Math.floor(diffInSeconds / 60);
      unit = "minute";
    } else if (Math.abs(diffInSeconds) < 86400) {
      value = Math.floor(diffInSeconds / 3600);
      unit = "hour";
    } else {
      value = Math.floor(diffInSeconds / 86400);
      unit = "day";
    }
    element.innerText = rtf.format(-value, unit);
  });
});
