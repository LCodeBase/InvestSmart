document.addEventListener('DOMContentLoaded', function () {
  const investmentForm = document.getElementById('investment-form')
  const recommendationDiv = document.getElementById('investment-recommendation')

  // Taxas de retorno atualizadas baseadas em dados reais do mercado brasileiro
  const returnRates = {
    conservador: {
      tesouro: 0.0925, // Tesouro Selic - ~9.25% a.a.
      cdb: 0.095, // CDB de bancos grandes - ~9.5% a.a.
      fundosRF: 0.09, // Fundos de Renda Fixa - ~9% a.a.
    },
    moderado: {
      debentures: 0.115, // Debêntures - ~11.5% a.a.
      fundosMultimercado: 0.12, // Fundos Multimercado - ~12% a.a.
      acoesDividendos: 0.13, // Ações de dividendos - ~13% a.a.
    },
    arrojado: {
      acoes: 0.15, // Ações growth - ~15% a.a.
      fiis: 0.14, // Fundos Imobiliários - ~14% a.a.
      cripto: 0.2, // Criptomoedas (altamente volátil) - ~20% a.a.
    },
  }

  investmentForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const amount = parseFloat(
      document.getElementById('investment-amount').value
    )
    const riskLevel = document.getElementById('risk-level').value
    const period = document.getElementById('investment-period')
      ? parseInt(document.getElementById('investment-period').value)
      : 12
    const goal = document.getElementById('investment-goal')
      ? document.getElementById('investment-goal').value
      : 'geral'

    // Validação
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, insira um valor válido para investimento.')
      return
    }

    // Gerar recomendações baseadas nos parâmetros
    const recommendations = generateRecommendations(
      amount,
      riskLevel,
      period,
      goal
    )
    displayRecommendations(recommendations, amount, period)
  })

  function generateRecommendations(amount, riskLevel, period, goal) {
    const recommendations = []
    const rates = returnRates[riskLevel]
    const periodYears = period / 12

    // Lógica de recomendação baseada no perfil e objetivo
    if (riskLevel === 'conservador') {
      // Recomendações para perfil conservador
      recommendations.push({
        title: 'Tesouro Direto (Tesouro Selic)',
        allocation: 0.4,
        rate: rates.tesouro,
        futureValue: calculateFutureValue(
          amount * 0.4,
          rates.tesouro,
          periodYears
        ),
        description: 'Títulos públicos com alta segurança e liquidez diária.',
        pros: [
          'Garantido pelo Tesouro Nacional',
          'Baixo risco',
          'Liquidez diária',
        ],
        cons: ['Rendimento menor que outras opções', 'IR regressivo'],
      })

      recommendations.push({
        title: 'CDBs de Bancos de Primeira Linha',
        allocation: 0.35,
        rate: rates.cdb,
        futureValue: calculateFutureValue(
          amount * 0.35,
          rates.cdb,
          periodYears
        ),
        description:
          'Certificados de Depósito Bancário com garantia do FGC até R$ 250 mil.',
        pros: [
          'Protegido pelo FGC',
          'Rendimento superior à poupança',
          'Diversas opções de prazo',
        ],
        cons: ['Pode ter carência', 'IR regressivo'],
      })

      recommendations.push({
        title: 'Fundos de Renda Fixa',
        allocation: 0.25,
        rate: rates.fundosRF,
        futureValue: calculateFutureValue(
          amount * 0.25,
          rates.fundosRF,
          periodYears
        ),
        description:
          'Fundos que investem em títulos de renda fixa públicos e privados.',
        pros: [
          'Gestão profissional',
          'Diversificação',
          'Diferentes estratégias',
        ],
        cons: [
          'Taxa de administração',
          'IR regressivo',
          'Pode ter taxa de performance',
        ],
      })
    } else if (riskLevel === 'moderado') {
      // Recomendações para perfil moderado
      // Implementar lógica similar para perfil moderado
      recommendations.push({
        title: 'Debêntures Incentivadas',
        allocation: 0.3,
        rate: rates.debentures,
        futureValue: calculateFutureValue(
          amount * 0.3,
          rates.debentures,
          periodYears
        ),
        description:
          'Títulos de dívida corporativa com isenção de IR para pessoa física.',
        pros: [
          'Isenção de IR',
          'Rendimento atrativo',
          'Exposição ao crédito privado',
        ],
        cons: ['Menor liquidez', 'Risco de crédito do emissor'],
      })

      // Adicionar mais recomendações para perfil moderado...
    } else if (riskLevel === 'arrojado') {
      // Recomendações para perfil arrojado
      // Implementar lógica similar para perfil arrojado
      recommendations.push({
        title: 'ETFs de Índices de Ações',
        allocation: 0.35,
        rate: rates.acoes,
        futureValue: calculateFutureValue(
          amount * 0.35,
          rates.acoes,
          periodYears
        ),
        description:
          'Fundos negociados em bolsa que replicam índices como Ibovespa.',
        pros: ['Diversificação', 'Baixo custo', 'Liquidez em bolsa'],
        cons: [
          'Volatilidade alta',
          'Risco de mercado',
          'Tributação de 15% sobre ganho de capital',
        ],
      })

      // Adicionar mais recomendações para perfil arrojado...
    }

    return recommendations
  }

  function calculateFutureValue(principal, rate, years) {
    return principal * Math.pow(1 + rate, years)
  }

  function displayRecommendations(recommendations, totalAmount, period) {
    const periodYears = period / 12
    let totalFutureValue = 0
    recommendations.forEach((rec) => {
      totalFutureValue += rec.futureValue
    })

    let html = `
            <h3>Sua Recomendação Personalizada</h3>
            <p>Com base no seu perfil e nos dados atuais do mercado, recomendamos a seguinte alocação para seu investimento de <strong>R$ ${totalAmount.toLocaleString(
              'pt-BR'
            )}</strong> por <strong>${period} meses</strong>:</p>

            <div class="recommendation-summary">
                <p>Valor futuro estimado após ${period} meses: <strong>R$ ${totalFutureValue.toLocaleString(
      'pt-BR',
      { maximumFractionDigits: 2 }
    )}</strong></p>
                <p>Ganho estimado: <strong>R$ ${(
                  totalFutureValue - totalAmount
                ).toLocaleString('pt-BR', {
                  maximumFractionDigits: 2,
                })}</strong> (${(
      (totalFutureValue / totalAmount - 1) *
      100
    ).toFixed(2)}%)</p>
            </div>

            <div class="recommendation-chart">
                <!-- Aqui poderia ser inserido um gráfico visual da alocação -->
            </div>
        `

    recommendations.forEach((rec) => {
      html += `
                <div class="recommendation">
                    <h4>${rec.title} - ${(rec.allocation * 100).toFixed(
        0
      )}% (R$ ${(totalAmount * rec.allocation).toLocaleString('pt-BR')})</h4>
                    <p>${rec.description}</p>
                    <p>Rendimento anual estimado: <strong>${(
                      rec.rate * 100
                    ).toFixed(2)}%</strong></p>
                    <p>Valor estimado após ${period} meses: <strong>R$ ${rec.futureValue.toLocaleString(
        'pt-BR',
        { maximumFractionDigits: 2 }
      )}</strong></p>

                    <div class="pros-cons">
                        <div class="pros">
                            <h5>Vantagens</h5>
                            <ul>
                                ${rec.pros
                                  .map((pro) => `<li>${pro}</li>`)
                                  .join('')}
                            </ul>
                        </div>
                        <div class="cons">
                            <h5>Considerações</h5>
                            <ul>
                                ${rec.cons
                                  .map((con) => `<li>${con}</li>`)
                                  .join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `
    })

    html += `
            <div class="disclaimer">
                <p><strong>Aviso importante:</strong> As projeções acima são baseadas em dados históricos e taxas atuais do mercado. Rendimentos passados não garantem rendimentos futuros. Esta recomendação não constitui aconselhamento financeiro personalizado. Consulte um profissional certificado antes de tomar decisões de investimento.</p>
            </div>
        `

    recommendationDiv.innerHTML = html
  }
})

const investmentForm = document.getElementById('investment-form')
const investmentRecommendationDiv = document.getElementById(
  'investment-recommendation'
)

const investmentOptions = [
  {
    name: 'CDB',
    riskLevel: 'conservador',
    minAmount: 100,
    returnRate: 0.009,
    example: 'Banco Inter',
    link: 'https://www.bancointer.com.br/investimentos/cdb/',
    description:
      'Certificado de Depósito Bancário: Empréstimo para o banco com rendimento fixo.',
  },
  {
    name: 'Tesouro Direto',
    riskLevel: 'conservador',
    minAmount: 30,
    returnRate: 0.01,
    example: 'Tesouro Selic',
    link: 'https://www.tesourodireto.com.br/titulos/tipos-de-tesouro.htm',
    description:
      'Títulos públicos emitidos pelo governo federal com diferentes prazos e rentabilidades.',
  },
  {
    name: 'LCI/LCA',
    riskLevel: 'conservador',
    minAmount: 1000,
    returnRate: 0.0095,
    example: 'XP Investimentos',
    link: 'https://www.xpi.com.br/investimentos/renda-fixa/lci-lca/',
    description:
      'Letras de Crédito Imobiliário/do Agronegócio: Investimentos isentos de IR para pessoa física.',
  },
  {
    name: 'Fundos de Renda Fixa',
    riskLevel: 'moderado',
    minAmount: 100,
    returnRate: 0.011,
    example: 'BTG Pactual',
    link: 'https://investimentos.btgpactual.com/renda-fixa',
    description:
      'Carteira diversificada de títulos de renda fixa gerida por profissionais.',
  },
  {
    name: 'Fundos Multimercado',
    riskLevel: 'moderado',
    minAmount: 500,
    returnRate: 0.013,
    example: 'Órama',
    link: 'https://www.orama.com.br/investimentos/fundos-de-investimento/lista-fundos/multimercado',
    description:
      'Fundos que investem em diferentes classes de ativos, buscando melhor relação risco-retorno.',
  },
  {
    name: 'ETFs',
    riskLevel: 'moderado',
    minAmount: 100,
    returnRate: 0.012,
    example: 'iShares BOVA11',
    link: 'https://www.blackrock.com/br/produtos/251816/ishares-ibovespa-fundo-de-ndice-fund',
    description:
      'Fundos negociados em bolsa que acompanham índices de mercado.',
  },
  {
    name: 'Ações',
    riskLevel: 'arrojado',
    minAmount: 100,
    returnRate: 0.015,
    example: 'PETR4',
    link: 'https://www.clear.com.br/site/acoes',
    description:
      'Participação na propriedade de empresas listadas na bolsa de valores.',
  },
  {
    name: 'FIIs',
    riskLevel: 'arrojado',
    minAmount: 100,
    returnRate: 0.014,
    example: 'KNRI11',
    link: 'https://www.rico.com.br/fundos-imobiliarios',
    description:
      'Fundos de Investimento Imobiliário: Investimento em imóveis comerciais, shoppings, galpões, etc.',
  },
  {
    name: 'Criptomoedas',
    riskLevel: 'arrojado',
    minAmount: 50,
    returnRate: 0.02,
    example: 'Bitcoin',
    link: 'https://www.binance.com/pt-BR/buy-sell-crypto',
    description:
      'Moedas digitais descentralizadas baseadas em tecnologia blockchain.',
  },
  {
    name: 'Debêntures',
    riskLevel: 'moderado',
    minAmount: 1000,
    returnRate: 0.0115,
    example: 'Debêntures Incentivadas',
    link: 'https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/renda-fixa/debentures.htm',
    description:
      'Títulos de dívida emitidos por empresas para financiar projetos e operações.',
  },
  {
    name: 'COE',
    riskLevel: 'moderado',
    minAmount: 5000,
    returnRate: 0.0125,
    example: 'COE Autocall',
    link: 'https://www.xpi.com.br/investimentos/coe/',
    description:
      'Certificado de Operações Estruturadas: Produto que combina renda fixa e variável.',
  },
  {
    name: 'Fundos de Ações',
    riskLevel: 'arrojado',
    minAmount: 100,
    returnRate: 0.016,
    example: 'Alaska Black FIC FIA',
    link: 'https://www.alaska-asset.com.br/',
    description:
      'Fundos que investem principalmente em ações, geridos por profissionais.',
  },
]

investmentForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const amount = parseFloat(document.getElementById('investment-amount').value)
  const riskLevel = document.getElementById('risk-level').value

  if (isNaN(amount) || amount < 10) {
    alert('Por favor, insira um valor válido (mínimo R$ 10,00).')
    return
  }

  getInvestmentRecommendations(amount, riskLevel)
})

function calculateReturns(investment, amount) {
  const monthlyReturn = amount * investment.returnRate
  const annualReturn = monthlyReturn * 12
  const fiveYearReturn = annualReturn * 5

  return {
    monthlyReturn,
    annualReturn,
    fiveYearReturn,
  }
}

function getInvestmentRecommendations(amount, riskLevel) {
  const chosenRecommendations = investmentOptions.filter(
    (option) => option.riskLevel === riskLevel && option.minAmount <= amount
  )

  investmentRecommendationDiv.innerHTML = `
        <h3>Recomendações de Investimento</h3>
        <p>Valor: ${formatCurrency(amount)} | Perfil de Risco: ${
    riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)
  }</p>
    `

  if (chosenRecommendations.length === 0) {
    investmentRecommendationDiv.innerHTML += `<p>Nenhuma recomendação disponível para este valor e nível de risco. Tente aumentar o valor ou ajustar o nível de risco.</p>`
  } else {
    chosenRecommendations.forEach((rec) => {
      const returns = calculateReturns(rec, amount)
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
            `
    })
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

document
  .getElementById('investment-amount')
  .addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '')
    value = (parseInt(value) / 100).toFixed(2)
    e.target.value = value
  })

investmentRecommendationDiv.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('info-icon')) {
    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.textContent = e.target.getAttribute('title')
    tooltip.style.position = 'absolute'
    tooltip.style.left = e.pageX + 'px'
    tooltip.style.top = e.pageY + 'px'
    tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)'
    tooltip.style.color = 'white'
    tooltip.style.padding = '5px'
    tooltip.style.borderRadius = '3px'
    tooltip.style.zIndex = '1000'
    document.body.appendChild(tooltip)

    e.target.addEventListener('mouseout', function () {
      document.body.removeChild(tooltip)
    })
  }
})
