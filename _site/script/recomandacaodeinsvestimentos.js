const investmentForm = document.getElementById("investment-form");
const investmentRecommendationDiv = document.getElementById(
  "investment-recommendation"
);

const investmentOptions = [
  {
    name: "CDB",
    riskLevel: "conservador",
    minAmount: 100,
    returnRate: 0.009,
    example: "Banco Inter",
    link: "https://www.bancointer.com.br/investimentos/cdb/",
    description:
      "Certificado de Depósito Bancário: Empréstimo para o banco com rendimento fixo.",
  },
  {
    name: "Tesouro Direto",
    riskLevel: "conservador",
    minAmount: 30,
    returnRate: 0.01,
    example: "Tesouro Selic",
    link: "https://www.tesourodireto.com.br/titulos/tipos-de-tesouro.htm",
    description:
      "Títulos públicos emitidos pelo governo federal com diferentes prazos e rentabilidades.",
  },
  {
    name: "LCI/LCA",
    riskLevel: "conservador",
    minAmount: 1000,
    returnRate: 0.0095,
    example: "XP Investimentos",
    link: "https://www.xpi.com.br/investimentos/renda-fixa/lci-lca/",
    description:
      "Letras de Crédito Imobiliário/do Agronegócio: Investimentos isentos de IR para pessoa física.",
  },
  {
    name: "Fundos de Renda Fixa",
    riskLevel: "moderado",
    minAmount: 100,
    returnRate: 0.011,
    example: "BTG Pactual",
    link: "https://investimentos.btgpactual.com/renda-fixa",
    description:
      "Carteira diversificada de títulos de renda fixa gerida por profissionais.",
  },
  {
    name: "Fundos Multimercado",
    riskLevel: "moderado",
    minAmount: 500,
    returnRate: 0.013,
    example: "Órama",
    link: "https://www.orama.com.br/investimentos/fundos-de-investimento/lista-fundos/multimercado",
    description:
      "Fundos que investem em diferentes classes de ativos, buscando melhor relação risco-retorno.",
  },
  {
    name: "ETFs",
    riskLevel: "moderado",
    minAmount: 100,
    returnRate: 0.012,
    example: "iShares BOVA11",
    link: "https://www.blackrock.com/br/produtos/251816/ishares-ibovespa-fundo-de-ndice-fund",
    description:
      "Fundos negociados em bolsa que acompanham índices de mercado.",
  },
  {
    name: "Ações",
    riskLevel: "arrojado",
    minAmount: 100,
    returnRate: 0.015,
    example: "PETR4",
    link: "https://www.clear.com.br/site/acoes",
    description:
      "Participação na propriedade de empresas listadas na bolsa de valores.",
  },
  {
    name: "FIIs",
    riskLevel: "arrojado",
    minAmount: 100,
    returnRate: 0.014,
    example: "KNRI11",
    link: "https://www.rico.com.br/fundos-imobiliarios",
    description:
      "Fundos de Investimento Imobiliário: Investimento em imóveis comerciais, shoppings, galpões, etc.",
  },
  {
    name: "Criptomoedas",
    riskLevel: "arrojado",
    minAmount: 50,
    returnRate: 0.02,
    example: "Bitcoin",
    link: "https://www.binance.com/pt-BR/buy-sell-crypto",
    description:
      "Moedas digitais descentralizadas baseadas em tecnologia blockchain.",
  },
  {
    name: "Debêntures",
    riskLevel: "moderado",
    minAmount: 1000,
    returnRate: 0.0115,
    example: "Debêntures Incentivadas",
    link: "https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-fixa/debentures.htm",
    description:
      "Títulos de dívida emitidos por empresas para financiar projetos e operações.",
  },
  {
    name: "COE",
    riskLevel: "moderado",
    minAmount: 5000,
    returnRate: 0.0125,
    example: "COE Autocall",
    link: "https://www.xpi.com.br/investimentos/coe/",
    description:
      "Certificado de Operações Estruturadas: Produto que combina renda fixa e variável.",
  },
  {
    name: "Fundos de Ações",
    riskLevel: "arrojado",
    minAmount: 100,
    returnRate: 0.016,
    example: "Alaska Black FIC FIA",
    link: "https://www.alaska-asset.com.br/",
    description:
      "Fundos que investem principalmente em ações, geridos por profissionais.",
  },
];

investmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("investment-amount").value);
  const riskLevel = document.getElementById("risk-level").value;

  if (isNaN(amount) || amount < 10) {
    alert("Por favor, insira um valor válido (mínimo R$ 10,00).");
    return;
  }

  getInvestmentRecommendations(amount, riskLevel);
});

function calculateReturns(investment, amount) {
  const monthlyReturn = amount * investment.returnRate;
  const annualReturn = monthlyReturn * 12;
  const fiveYearReturn = annualReturn * 5;

  return {
    monthlyReturn,
    annualReturn,
    fiveYearReturn,
  };
}

function getInvestmentRecommendations(amount, riskLevel) {
  const chosenRecommendations = investmentOptions.filter(
    (option) => option.riskLevel === riskLevel && option.minAmount <= amount
  );

  investmentRecommendationDiv.innerHTML = `
        <h3>Recomendações de Investimento</h3>
        <p>Valor: ${formatCurrency(amount)} | Perfil de Risco: ${
    riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)
  }</p>
    `;

  if (chosenRecommendations.length === 0) {
    investmentRecommendationDiv.innerHTML += `<p>Nenhuma recomendação disponível para este valor e nível de risco. Tente aumentar o valor ou ajustar o nível de risco.</p>`;
  } else {
    chosenRecommendations.forEach((rec) => {
      const returns = calculateReturns(rec, amount);
      investmentRecommendationDiv.innerHTML += `
                <div class="recommendation">
                    <h4>${rec.name} (${rec.example})
                        <span class="info-icon" title="${
                          rec.description
                        }">&#9432;</span>
                    </h4>
                    <p>Valor mínimo: ${formatCurrency(rec.minAmount)}</p>
                    <ul>
                        <li>Rendimento Mensal Estimado: ${formatCurrency(
                          returns.monthlyReturn
                        )}</li>
                        <li>Rendimento Anual Estimado: ${formatCurrency(
                          returns.annualReturn
                        )}</li>
                        <li>Rendimento em 5 Anos Estimado: ${formatCurrency(
                          returns.fiveYearReturn
                        )}</li>
                    </ul>
                    <a href="${
                      rec.link
                    }" target="_blank" rel="noopener noreferrer">Investir agora</a>
                </div>
            `;
    });
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

document
  .getElementById("investment-amount")
  .addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = (parseInt(value) / 100).toFixed(2);
    e.target.value = value;
  });

investmentRecommendationDiv.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("info-icon")) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = e.target.getAttribute("title");
    tooltip.style.position = "absolute";
    tooltip.style.left = e.pageX + "px";
    tooltip.style.top = e.pageY + "px";
    tooltip.style.backgroundColor = "rgba(0,0,0,0.8)";
    tooltip.style.color = "white";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "3px";
    tooltip.style.zIndex = "1000";
    document.body.appendChild(tooltip);

    e.target.addEventListener("mouseout", function () {
      document.body.removeChild(tooltip);
    });
  }
});
