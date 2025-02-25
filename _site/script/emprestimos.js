// Add new functions

function generateAmortizationSchedule(valor, taxa, prazo) {
  let saldo = valor;
  const parcela = calcularParcela(valor, taxa, prazo);
  const schedule = [];

  for (let i = 1; i <= prazo; i++) {
    const juros = saldo * taxa;
    const amortizacao = parcela - juros;
    saldo -= amortizacao;

    schedule.push({
      parcela: i,
      valorParcela: parcela,
      juros: juros,
      amortizacao: amortizacao,
      saldo: saldo,
    });
  }

  return schedule;
}

function createComparisonChart(data) {
  const ctx = document.createElement("canvas");
  document.querySelector(".chart-container").appendChild(ctx);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Total a Pagar", "Juros", "Valor Original"],
      datasets: [
        {
          data: [data.totalPago, data.jurosTotal, data.valor],
          backgroundColor: ["#118a5f", "#ff6b6b", "#4ecdc4"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
