document
  .getElementById("retirement-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const currentAge = parseInt(document.getElementById("currentAge").value);
    const retirementAge = parseInt(
      document.getElementById("retirementAge").value
    );
    const currentSavings = parseFloat(
      document.getElementById("currentSavings").value
    );
    const desiredIncome = parseFloat(
      document.getElementById("desiredIncome").value
    );
    const monthlyContribution = parseFloat(
      document.getElementById("monthlyContribution").value
    );
    const expectedReturn =
      parseFloat(document.getElementById("expectedReturn").value) / 100;

    // Cálculos básicos
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;

    // Valor necessário para aposentadoria (usando regra do 4%)
    const totalNeeded = (desiredIncome * 12) / 0.04;

    // Cálculo de contribuição mensal necessária
    const futureValue = totalNeeded;
    const presentValue = currentSavings;
    const monthlyRate = expectedReturn / 12;

    const suggestedContribution =
      (futureValue -
        presentValue * Math.pow(1 + monthlyRate, monthsToRetirement)) /
      ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate);

    // Exibir resultados
    document.getElementById(
      "totalNeeded"
    ).textContent = `R$ ${totalNeeded.toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
    })}`;
    document.getElementById(
      "suggestedContribution"
    ).textContent = `R$ ${suggestedContribution.toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
    })}`;
    document.getElementById(
      "timeToRetirement"
    ).textContent = `${yearsToRetirement} anos`;

    document.getElementById("results").style.display = "block";

    // Criar gráfico de projeção
    createProjectionChart(
      currentSavings,
      suggestedContribution,
      expectedReturn,
      yearsToRetirement
    );
  });

function createProjectionChart(
  initialValue,
  monthlyContribution,
  returnRate,
  years
) {
  const ctx = document.getElementById("projectionChart").getContext("2d");
  const labels = Array.from({ length: years + 1 }, (_, i) => `Ano ${i}`);
  const data = calculateProjection(
    initialValue,
    monthlyContribution,
    returnRate,
    years
  );

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Projeção do Patrimônio",
          data: data,
          borderColor: "#118a5f",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Projeção do Patrimônio ao Longo do Tempo",
        },
      },
    },
  });
}
