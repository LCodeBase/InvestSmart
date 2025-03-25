document.addEventListener('DOMContentLoaded', () => {
  // Navigation handling
  const buttons = document.querySelectorAll('nav button')
  const sections = document.querySelectorAll('.section')

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.id.replace('Btn', '')

      // Update active button
      buttons.forEach((b) => b.classList.remove('active'))
      button.classList.add('active')

      // Update active section
      sections.forEach((section) => {
        section.classList.remove('active')
        if (section.id === targetId) {
          section.classList.add('active')
        }
      })
    })
  })

  // Initialize sliders
  const taxRateSlider = document.getElementById('taxRate')
  const publicSpendingSlider = document.getElementById('publicSpending')
  const taxBurdenSlider = document.getElementById('taxBurden')

  if (taxRateSlider) {
    taxRateSlider.addEventListener('input', (e) => {
      document.getElementById('taxRateValue').textContent = `${e.target.value}%`
      updateSimulation()
    })
  }

  if (publicSpendingSlider) {
    publicSpendingSlider.addEventListener('input', (e) => {
      document.getElementById(
        'publicSpendingValue'
      ).textContent = `${e.target.value}%`
      updateSimulation()
    })
  }

  if (taxBurdenSlider) {
    taxBurdenSlider.addEventListener('input', (e) => {
      document.getElementById(
        'taxBurdenValue'
      ).textContent = `${e.target.value}%`
      updateSimulation()
    })
  }

  // Reset button functionality
  const resetButton = document.getElementById('resetSimulation')
  if (resetButton) {
    resetButton.addEventListener('click', resetSimulation)
  }

  // Initialize charts
  initializeCharts()

  // Fetch economic data
  fetchEconomicData()
})

// Global variables to store current economic data and charts
let currentEconomicData = {}
let gdpChart, inflationChart, unemploymentChart

function updateSimulation() {
  // Get values from sliders
  const taxRate = parseFloat(document.getElementById('taxRate').value)
  const publicSpending = parseFloat(
    document.getElementById('publicSpending').value
  )
  const taxBurden = parseFloat(
    document.getElementById('taxBurden')?.value || 33
  )

  // Calculate impacts on different economic indicators
  const gdpImpact = calculateGDPImpact(taxRate, publicSpending, taxBurden)
  const inflationImpact = calculateInflationImpact(
    taxRate,
    publicSpending,
    taxBurden
  )
  const unemploymentImpact = calculateUnemploymentImpact(
    taxRate,
    publicSpending,
    taxBurden
  )

  // Update charts with new data
  updateCharts(gdpImpact, inflationImpact, unemploymentImpact)

  // Update analysis text
  updateAnalysis(
    taxRate,
    publicSpending,
    taxBurden,
    gdpImpact,
    inflationImpact,
    unemploymentImpact
  )
}

// Separate function definition for updateAnalysis
function updateAnalysis(
  taxRate,
  publicSpending,
  taxBurden,
  gdpImpact,
  inflationImpact,
  unemploymentImpact
) {
  const analysisElement = document.getElementById('simulationAnalysis')
  if (!analysisElement) return

  // Calculate average values for the projection period
  const avgGDP = gdpImpact.reduce((sum, val) => sum + val, 0) / gdpImpact.length
  const avgInflation =
    inflationImpact.reduce((sum, val) => sum + val, 0) / inflationImpact.length
  const avgUnemployment =
    unemploymentImpact.reduce((sum, val) => sum + val, 0) /
    unemploymentImpact.length

  // Determine economic scenario based on indicators
  let growthAssessment,
    inflationAssessment,
    unemploymentAssessment,
    overallAssessment

  // GDP growth assessment
  if (avgGDP > 3.5) {
    growthAssessment = 'forte crescimento econômico'
  } else if (avgGDP > 2) {
    growthAssessment = 'crescimento econômico moderado'
  } else if (avgGDP > 0) {
    growthAssessment = 'crescimento econômico fraco'
  } else {
    growthAssessment = 'recessão econômica'
  }

  // Rest of the function remains the same

  // Inflation assessment
  if (avgInflation > 8) {
    inflationAssessment = 'inflação muito alta'
  } else if (avgInflation > 5) {
    inflationAssessment = 'inflação alta'
  } else if (avgInflation > 3) {
    inflationAssessment = 'inflação moderada'
  } else if (avgInflation > 1) {
    inflationAssessment = 'inflação controlada'
  } else {
    inflationAssessment = 'risco de deflação'
  }

  // Unemployment assessment
  if (avgUnemployment > 12) {
    unemploymentAssessment = 'desemprego muito alto'
  } else if (avgUnemployment > 8) {
    unemploymentAssessment = 'desemprego alto'
  } else if (avgUnemployment > 5) {
    unemploymentAssessment = 'desemprego moderado'
  } else {
    unemploymentAssessment = 'baixo desemprego'
  }

  // Policy recommendations
  let recommendations = []

  if (taxRate > 12 && avgGDP < 2) {
    recommendations.push(
      'Considere reduzir a taxa de juros para estimular o crescimento econômico.'
    )
  } else if (taxRate < 5 && avgInflation > 6) {
    recommendations.push(
      'Considere aumentar a taxa de juros para controlar a inflação.'
    )
  }

  if (publicSpending > 40 && avgInflation > 5) {
    recommendations.push(
      'Considere reduzir os gastos públicos para controlar a inflação e o déficit fiscal.'
    )
  } else if (publicSpending < 25 && avgUnemployment > 10) {
    recommendations.push(
      'Considere aumentar os gastos públicos para estimular o emprego.'
    )
  }

  if (taxBurden > 35 && avgGDP < 2) {
    recommendations.push(
      'Considere reduzir a carga tributária para estimular o consumo e investimentos.'
    )
  }

  // Overall assessment
  let economicHealth =
    (avgGDP > 2 ? 1 : -1) +
    (avgInflation < 5 ? 1 : -1) +
    (avgUnemployment < 8 ? 1 : -1)

  if (economicHealth >= 2) {
    overallAssessment = 'economia saudável e equilibrada'
  } else if (economicHealth > -1) {
    overallAssessment = 'economia com desafios moderados'
  } else {
    overallAssessment = 'economia com sérios desequilíbrios'
  }

  // Format numbers for display
  const formatNumber = (num) => num.toFixed(1)

  // Build the analysis text
  let analysisText = `
      <p>Com uma taxa de juros de <strong>${taxRate}%</strong>, gastos públicos de <strong>${publicSpending}% do PIB</strong>
      e carga tributária de <strong>${taxBurden}% do PIB</strong>, a projeção indica:</p>

      <ul>
        <li>Crescimento médio do PIB: <strong>${formatNumber(
          avgGDP
        )}%</strong> (${growthAssessment})</li>
        <li>Inflação média: <strong>${formatNumber(
          avgInflation
        )}%</strong> (${inflationAssessment})</li>
        <li>Taxa média de desemprego: <strong>${formatNumber(
          avgUnemployment
        )}%</strong> (${unemploymentAssessment})</li>
      </ul>

      <p>Avaliação geral: Este cenário projeta uma <strong>${overallAssessment}</strong>.</p>
    `

  // Add recommendations if any
  if (recommendations.length > 0) {
    analysisText += `<p><strong>Recomendações:</strong></p><ul>`
    recommendations.forEach((rec) => {
      analysisText += `<li>${rec}</li>`
    })
    analysisText += `</ul>`
  }

  // Update the DOM with the analysis
  analysisElement.innerHTML = analysisText
}

function resetSimulation() {
  // Reset sliders to current real-world values
  if (currentEconomicData.interestRate) {
    const taxRateSlider = document.getElementById('taxRate')
    taxRateSlider.value = currentEconomicData.interestRate
    document.getElementById(
      'taxRateValue'
    ).textContent = `${currentEconomicData.interestRate}%`
  }

  if (currentEconomicData.publicSpending) {
    const publicSpendingSlider = document.getElementById('publicSpending')
    publicSpendingSlider.value = currentEconomicData.publicSpending
    document.getElementById(
      'publicSpendingValue'
    ).textContent = `${currentEconomicData.publicSpending}%`
  }

  if (currentEconomicData.taxBurden) {
    const taxBurdenSlider = document.getElementById('taxBurden')
    if (taxBurdenSlider) {
      taxBurdenSlider.value = currentEconomicData.taxBurden
      document.getElementById(
        'taxBurdenValue'
      ).textContent = `${currentEconomicData.taxBurden}%`
    }
  }

  // Update simulation with reset values
  updateSimulation()
}

function initializeCharts() {
  // Initialize GDP chart
  const gdpCtx = document.getElementById('gdpChart')?.getContext('2d')
  if (gdpCtx) {
    gdpChart = new Chart(gdpCtx, {
      type: 'line',
      data: {
        labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
        datasets: [
          {
            label: 'PIB Projetado (% crescimento)',
            data: [2.5, 2.7, 2.9, 3.0, 3.1],
            borderColor: '#27ae60',
            backgroundColor: 'rgba(39, 174, 96, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Projeção de Crescimento do PIB',
            font: {
              size: 16,
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Crescimento (%)',
            },
          },
        },
      },
    })
  }

  // Initialize Inflation chart
  const inflationCtx = document
    .getElementById('inflationChart')
    ?.getContext('2d')
  if (inflationCtx) {
    inflationChart = new Chart(inflationCtx, {
      type: 'line',
      data: {
        labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
        datasets: [
          {
            label: 'Inflação Projetada (%)',
            data: [4.5, 4.2, 4.0, 3.8, 3.5],
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Projeção de Inflação',
            font: {
              size: 16,
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Inflação (%)',
            },
          },
        },
      },
    })
  }

  // Initialize Unemployment chart
  const unemploymentCtx = document
    .getElementById('unemploymentChart')
    ?.getContext('2d')
  if (unemploymentCtx) {
    unemploymentChart = new Chart(unemploymentCtx, {
      type: 'line',
      data: {
        labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
        datasets: [
          {
            label: 'Taxa de Desemprego Projetada (%)',
            data: [8.5, 8.2, 7.9, 7.7, 7.5],
            borderColor: '#f39c12',
            backgroundColor: 'rgba(243, 156, 18, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Projeção de Desemprego',
            font: {
              size: 16,
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Desemprego (%)',
            },
          },
        },
      },
    })
  }

  // If we still need the original simulation chart
  const simulationCtx = document
    .getElementById('simulationChart')
    ?.getContext('2d')
  if (simulationCtx) {
    simulationChart = new Chart(simulationCtx, {
      type: 'line',
      data: {
        labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
        datasets: [
          {
            label: 'PIB Projetado',
            data: [100, 102, 104, 106, 108],
            borderColor: '#3498db',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Projeção Econômica',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    })
  }
}

function updateCharts(gdpImpact, inflationImpact, unemploymentImpact) {
  // Update GDP chart
  if (gdpChart) {
    gdpChart.data.datasets[0].data = gdpImpact
    gdpChart.update()
  }

  // Update Inflation chart
  if (inflationChart) {
    inflationChart.data.datasets[0].data = inflationImpact
    inflationChart.update()
  }

  // Update Unemployment chart
  if (unemploymentChart) {
    unemploymentChart.data.datasets[0].data = unemploymentImpact
    unemploymentChart.update()
  }

  // Update original simulation chart if it exists
  if (typeof simulationChart !== 'undefined') {
    simulationChart.data.datasets[0].data = gdpImpact
    simulationChart.update()
  }
}

function calculateGDPImpact(taxRate, publicSpending, taxBurden) {
  // More sophisticated economic model based on real economic principles
  const baseGrowth = 2.5 // Base growth rate in %
  const years = 5
  const result = []

  // Factors that affect GDP growth
  const interestFactor = -0.15 // Higher interest rates reduce growth
  const spendingFactor = 0.1 // Public spending can stimulate growth in short term
  const taxBurdenFactor = -0.12 // Higher tax burden reduces growth

  // Calculate optimal values (simplified)
  const optimalInterestRate = 7 // Theoretical optimal interest rate
  const optimalSpending = 30 // Theoretical optimal public spending
  const optimalTaxBurden = 25 // Theoretical optimal tax burden

  // Calculate deviations from optimal
  const interestDeviation = taxRate - optimalInterestRate
  const spendingDeviation = publicSpending - optimalSpending
  const taxBurdenDeviation = taxBurden - optimalTaxBurden

  let currentGrowth = baseGrowth

  for (let i = 0; i < years; i++) {
    // Growth is affected by deviations from optimal values
    // Interest rate effect increases over time (monetary policy lag)
    const interestEffect = interestDeviation * interestFactor * (1 + i * 0.2)

    // Spending effect diminishes over time (fiscal stimulus fades)
    const spendingEffect = spendingDeviation * spendingFactor * (1 - i * 0.15)

    // Tax burden effect increases over time (structural impact)
    const taxBurdenEffect = taxBurdenDeviation * taxBurdenFactor * (1 + i * 0.1)

    // Calculate year's growth rate with some randomness to simulate real-world uncertainty
    const yearGrowth =
      currentGrowth + interestEffect + spendingEffect + taxBurdenEffect

    // Add some persistence (growth tends to follow trends)
    currentGrowth = yearGrowth * 0.7 + baseGrowth * 0.3

    // Ensure growth stays within realistic bounds
    result.push(Math.max(Math.min(currentGrowth, 10), -5))
  }

  return result
}

function calculateInflationImpact(taxRate, publicSpending, taxBurden) {
  // Inflation model based on monetary policy and fiscal policy
  const baseInflation = 4.5 // Base inflation rate in %
  const years = 5
  const result = []

  // Factors that affect inflation
  const interestFactor = -0.3 // Higher interest rates reduce inflation
  const spendingFactor = 0.15 // Higher public spending can increase inflation
  const taxBurdenFactor = -0.05 // Higher taxes can reduce demand and inflation

  // Calculate optimal values
  const optimalInterestRate = 7 // Theoretical optimal interest rate
  const optimalSpending = 30 // Theoretical optimal public spending

  // Calculate deviations from optimal
  const interestDeviation = taxRate - optimalInterestRate
  const spendingDeviation = publicSpending - optimalSpending

  let currentInflation = baseInflation

  for (let i = 0; i < years; i++) {
    // Interest rate effect increases over time (monetary policy lag)
    const interestEffect = interestDeviation * interestFactor * (1 + i * 0.3)

    // Spending effect on inflation
    const spendingEffect = spendingDeviation * spendingFactor

    // Tax burden effect
    const taxBurdenEffect = (taxBurden - 33) * taxBurdenFactor

    // Calculate year's inflation with some persistence
    const yearInflation =
      currentInflation + interestEffect + spendingEffect + taxBurdenEffect

    // Add persistence (inflation is sticky)
    currentInflation = yearInflation * 0.8 + baseInflation * 0.2

    // Ensure inflation stays within realistic bounds
    result.push(Math.max(Math.min(currentInflation, 15), 0.5))
  }

  return result
}

function calculateUnemploymentImpact(taxRate, publicSpending, taxBurden) {
  // Unemployment model based on economic growth and policy
  const baseUnemployment = 8.5 // Base unemployment rate in %
  const years = 5
  const result = []

  // Get GDP growth to factor into unemployment (Okun's Law)
  const gdpGrowth = calculateGDPImpact(taxRate, publicSpending, taxBurden)

  // Factors that affect unemployment
  const growthFactor = -0.4 // Higher growth reduces unemployment
  const interestFactor = 0.1 // Higher interest rates can increase unemployment
  const taxBurdenFactor = 0.08 // Higher tax burden can increase unemployment

  let currentUnemployment = baseUnemployment

  for (let i = 0; i < years; i++) {
    // Growth effect on unemployment (Okun's Law)
    const growthEffect = gdpGrowth[i] * growthFactor

    // Interest rate effect on unemployment
    const interestEffect = (taxRate - 7) * interestFactor

    // Tax burden effect on unemployment
    const taxEffect = (taxBurden - 33) * taxBurdenFactor

    // Calculate year's unemployment with some persistence
    const yearUnemployment =
      currentUnemployment + growthEffect + interestEffect + taxEffect

    // Add persistence (unemployment is sticky)
    currentUnemployment = yearUnemployment * 0.8 + baseUnemployment * 0.2

    // Ensure unemployment stays within realistic bounds
    result.push(Math.max(Math.min(currentUnemployment, 20), 3))
  }

  return result
}
//API.JS
async function fetchEconomicData() {
  try {
    // Valores de fallback (dados econômicos brasileiros atuais)
    let gdp = 12500000000 // ~9.9 trilhões BRL
    let inflation = 5.06
    let unemployment = 6.5
    let interestRate = 14.25

    // Remover os spinners de carregamento e mostrar dados de fallback imediatamente
    document.getElementById('currentGDP').textContent = `${(
      gdp / 1000000000
    ).toFixed(2)} trilhões`
    document.getElementById(
      'currentInflation'
    ).textContent = `${inflation.toFixed(2)}%`
    document.getElementById(
      'currentUnemployment'
    ).textContent = `${unemployment}%`

    const interestRateElement = document.getElementById('currentInterestRate')
    if (interestRateElement) {
      interestRateElement.textContent = `${interestRate.toFixed(2)}%`
    }

    // Armazenar dados econômicos atuais para simulação
    currentEconomicData = {
      gdp: gdp,
      inflation: parseFloat(inflation),
      unemployment: parseFloat(unemployment),
      interestRate: parseFloat(interestRate),
      publicSpending: 33, // Valor padrão para o Brasil
      taxBurden: 33, // Valor padrão para o Brasil
    }

    // Inicializar sliders com os valores atuais
    initializeSliders()

    // Tentar buscar dados reais em segundo plano
    fetchRealData()
  } catch (error) {
    console.error('Erro no processamento de dados econômicos:', error)
  }
}

// Função para buscar dados reais em segundo plano
async function fetchRealData() {
  try {
    // Buscar PIB do IBGE (usando proxy para evitar CORS)
    fetch(
      'https://corsproxy.io/?https://servicodados.ibge.gov.br/api/v3/agregados/6784/periodos/-1/variaveis/9810?localidades=N1[all]'
    )
      .then((response) => response.json())
      .then((data) => {
        try {
          const gdpValue = data[0].resultados[0].series[0].serie
          const gdp = Object.values(gdpValue)[0]
          document.getElementById('currentGDP').textContent = `${(
            gdp / 1000000000
          ).toFixed(2)} trilhões`
          currentEconomicData.gdp = gdp
        } catch (e) {
          console.warn('Erro ao processar dados do PIB:', e)
        }
      })
      .catch((error) => console.warn('Falha ao buscar dados do PIB:', error))

    // Buscar inflação do BCB (usando proxy para evitar CORS)
    fetch(
      'https://corsproxy.io/?https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/1?formato=json'
    )
      .then((response) => response.json())
      .then((data) => {
        try {
          const inflation = data[0].valor
          document.getElementById(
            'currentInflation'
          ).textContent = `${parseFloat(inflation).toFixed(2)}%`
          currentEconomicData.inflation = parseFloat(inflation)
        } catch (e) {
          console.warn('Erro ao processar dados de inflação:', e)
        }
      })
      .catch((error) =>
        console.warn('Falha ao buscar dados de inflação:', error)
      )

    // Buscar desemprego do IBGE (usando proxy para evitar CORS)
    fetch(
      'https://corsproxy.io/?https://servicodados.ibge.gov.br/api/v3/agregados/6381/periodos/-1/variaveis/4099?localidades=N1[all]'
    )
      .then((response) => response.json())
      .then((data) => {
        try {
          const unemploymentValue = data[0].resultados[0].series[0].serie
          const unemployment = Object.values(unemploymentValue)[0]
          document.getElementById(
            'currentUnemployment'
          ).textContent = `${unemployment}%`
          currentEconomicData.unemployment = parseFloat(unemployment)
        } catch (e) {
          console.warn('Erro ao processar dados de desemprego:', e)
        }
      })
      .catch((error) =>
        console.warn('Falha ao buscar dados de desemprego:', error)
      )

    // Buscar taxa de juros (Selic) do BCB (usando proxy para evitar CORS)
    fetch(
      'https://corsproxy.io/?https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'
    )
      .then((response) => response.json())
      .then((data) => {
        try {
          const interestRate = data[0].valor
          const interestRateElement = document.getElementById(
            'currentInterestRate'
          )
          if (interestRateElement) {
            interestRateElement.textContent = `${parseFloat(
              interestRate
            ).toFixed(2)}%`
          }
          currentEconomicData.interestRate = parseFloat(interestRate)
        } catch (e) {
          console.warn('Erro ao processar dados da taxa de juros:', e)
        }
      })
      .catch((error) =>
        console.warn('Falha ao buscar dados da taxa de juros:', error)
      )
  } catch (error) {
    console.error('Erro ao buscar dados reais:', error)
  }
}

//1

// Initialize data when the page loads
document.addEventListener('DOMContentLoaded', fetchEconomicData)

// Refresh data every hour
setInterval(fetchEconomicData, 3600000)
