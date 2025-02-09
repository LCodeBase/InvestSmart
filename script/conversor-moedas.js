const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const result = document.getElementById("result");
const exchangeRate = document.getElementById("exchange-rate");
const swapBtn = document.getElementById("swap-btn");
const ratesList = document.getElementById("rates-list");

// API Key from ExchangeRate-API
const API_KEY = "07ca32210dd3ff348cb14e27";

// Mapping of currency codes to country names and descriptions
const currencyDescriptions = {
  USD: "Dólar Americano",
  EUR: "Euro",
  GBP: "Libra Esterlina",
  JPY: "Iene Japonês",
  CNY: "Yuan Chinês",
  AUD: "Dólar Australiano",
  CAD: "Dólar Canadense",
  CHF: "Franco Suíço",
  RUB: "Rublo Russo",
};

async function convertCurrency() {
  const amountValue = amount.value;
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromValue}`
    );
    const data = await response.json();

    const rate = data.conversion_rates[toValue];
    const convertedAmount = (amountValue * rate).toFixed(2);

    exchangeRate.innerText = `1 ${fromValue} = ${rate.toFixed(4)} ${toValue}`;
    result.innerText = `${convertedAmount} ${toValue}`;

    updateRates();
  } catch (error) {
    console.error("Erro na conversão:", error);
  }
}

function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
}

async function updateRates() {
  const baseCurrency = "BRL"; // Change base currency to BRL
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CNY",
    "AUD",
    "CAD",
    "CHF",
    "RUB",
  ];

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
    );
    const data = await response.json();

    ratesList.innerHTML = "";
    currencies.forEach((currency) => {
      const rate = data.conversion_rates[currency];
      const listItem = document.createElement("li");
      listItem.innerHTML = `<span>${
        currencyDescriptions[currency]
      }</span><br><span>1 ${currency} = ${(1 / rate).toFixed(4)} BRL</span>`;
      ratesList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erro ao atualizar cotações:", error);
  }
}

// Event Listeners
amount.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);
swapBtn.addEventListener("click", swapCurrencies);

// Initial conversion and rates update
convertCurrency();
updateRates();
