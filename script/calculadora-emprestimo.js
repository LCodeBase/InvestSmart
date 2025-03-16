// Calculadora de Empréstimos - Script

// Variáveis globais
let loanType = 'personal'
let chart = null

// Taxas de juros padrão por tipo de empréstimo
const defaultRates = {
  personal: 12.0, // Empréstimo Pessoal
  auto: 9.5, // Financiamento de Veículo
  mortgage: 8.0, // Financiamento Imobiliário
  business: 14.5, // Empréstimo Empresarial
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
  // Configurar os botões de tipo de empréstimo
  setupLoanTypeButtons()

  // Calcular o empréstimo com os valores padrão
  calculateLoan()
})

// Configurar os botões de tipo de empréstimo
function setupLoanTypeButtons() {
  const buttons = document.querySelectorAll('.loan-type-btn')

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remover a classe 'active' de todos os botões
      buttons.forEach((btn) => btn.classList.remove('active'))

      // Adicionar a classe 'active' ao botão clicado
      this.classList.add('active')

      // Atualizar o tipo de empréstimo
      loanType = this.getAttribute('data-type')

      // Atualizar a taxa de juros com base no tipo de empréstimo
      document.getElementById('interest-rate').value = defaultRates[loanType]

      // Recalcular o empréstimo
      calculateLoan()

      // Atualizar a comparação de bancos
      updateBankComparison()
    })
  })
}

// Função principal para calcular o empréstimo
function calculateLoan() {
  // Obter os valores dos campos
  const loanAmount = parseFloat(document.getElementById('loan-amount').value)
  const annualRate =
    parseFloat(document.getElementById('interest-rate').value) / 100
  const years = parseInt(document.getElementById('loan-term').value)
  const paymentFrequency = document.getElementById('payment-frequency').value

  // Calcular a taxa de juros e número de pagamentos com base na frequência
  let periodsPerYear, periodLabel

  switch (paymentFrequency) {
    case 'biweekly':
      periodsPerYear = 26
      periodLabel = 'Quinzenal'
      break
    case 'weekly':
      periodsPerYear = 52
      periodLabel = 'Semanal'
      break
    default: // monthly
      periodsPerYear = 12
      periodLabel = 'Mensal'
  }

  const periodicRate = annualRate / periodsPerYear
  const totalPeriods = years * periodsPerYear

  // Calcular o pagamento periódico
  const periodicPayment =
    (loanAmount * periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
    (Math.pow(1 + periodicRate, totalPeriods) - 1)

  // Calcular o custo total e juros totais
  const totalCost = periodicPayment * totalPeriods
  const totalInterest = totalCost - loanAmount

  // Atualizar os resultados na interface
  document.getElementById(
    'monthly-payment'
  ).textContent = `R$ ${periodicPayment.toFixed(2)}`
  document.getElementById(
    'total-interest'
  ).textContent = `R$ ${totalInterest.toFixed(2)}`
  document.getElementById('total-cost').textContent = `R$ ${totalCost.toFixed(
    2
  )}`

  // Gerar a tabela de amortização
  generateAmortizationTable(
    loanAmount,
    periodicRate,
    periodicPayment,
    totalPeriods
  )

  // Atualizar o gráfico
  updateChart(loanAmount, totalInterest)
}

// Gerar a tabela de amortização
function generateAmortizationTable(principal, rate, payment, periods) {
  const tableBody = document.getElementById('amortization-body')
  tableBody.innerHTML = ''

  // Limitar a 36 períodos para não sobrecarregar a página
  const displayPeriods = Math.min(periods, 36)
  let balance = principal

  for (let i = 1; i <= displayPeriods; i++) {
    const interest = balance * rate
    const principalPayment = payment - interest
    balance -= principalPayment

    // Criar a linha da tabela
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${i}</td>
      <td>R$ ${payment.toFixed(2)}</td>
      <td>R$ ${principalPayment.toFixed(2)}</td>
      <td>R$ ${interest.toFixed(2)}</td>
      <td>R$ ${Math.max(0, balance).toFixed(2)}</td>
    `

    tableBody.appendChild(row)
  }

  // Se houver mais períodos do que estamos exibindo, adicionar uma mensagem
  if (periods > displayPeriods) {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td colspan="5" style="text-align: center; font-style: italic;">
        ... mais ${periods - displayPeriods} períodos não exibidos ...
      </td>
    `
    tableBody.appendChild(row)
  }
}

// Atualizar o gráfico de distribuição
function updateChart(principal, interest) {
  const ctx = document.getElementById('payment-chart').getContext('2d')

  // Destruir o gráfico anterior se existir
  if (chart) {
    chart.destroy()
  }

  // Criar um novo gráfico
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Juros'],
      datasets: [
        {
          data: [principal, interest],
          backgroundColor: ['#118a5f', '#ff6b6b'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || ''
              const value = context.raw
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = Math.round((value / total) * 100)
              return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`
            },
          },
        },
      },
    },
  })
}

// Atualizar a comparação de bancos com base no tipo de empréstimo
function updateBankComparison() {
  // Taxas de juros por banco e tipo de empréstimo
  const bankRates = {
    personal: {
      'Banco do Brasil': 11.5,
      'Caixa Econômica': 12.8,
      Itaú: 13.2,
      Nubank: 10.9,
    },
    auto: {
      'Banco do Brasil': 9.2,
      'Caixa Econômica': 9.5,
      Itaú: 10.1,
      Nubank: 9.8,
    },
    mortgage: {
      'Banco do Brasil': 7.8,
      'Caixa Econômica': 7.5,
      Itaú: 8.2,
      Nubank: 8.5,
    },
    business: {
      'Banco do Brasil': 14.2,
      'Caixa Econômica': 14.8,
      Itaú: 15.1,
      Nubank: 13.9,
    },
  }

  // Obter as taxas para o tipo de empréstimo atual
  const rates = bankRates[loanType]

  // Atualizar as taxas na interface
  const bankCards = document.querySelectorAll('.bank-card')
  let i = 0

  for (const bank in rates) {
    if (i < bankCards.length) {
      const rateElement = bankCards[i].querySelector('.rate')
      rateElement.textContent = rates[bank].toFixed(1)
      bankCards[i].querySelector('h4').textContent = bank
      i++
    }
  }
}

// Função para formatar valores monetários
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}
