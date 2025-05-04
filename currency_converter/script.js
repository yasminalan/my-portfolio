let allCurrencies = [];

async function getAvailableCurrencies() {
  const currencyUrl = "dev/v1/currencies"
  allCurrencies = await fetchData(currencyUrl);
  allCurrencies = Object.keys(allCurrencies);

  let selectTag1 = document.getElementById("from");
  let selectTag2 = document.getElementById("to");

  allCurrencies.forEach(currency => {
    let optionTag1 = document.createElement("option");
    if (currency == "EUR") {
      optionTag1.selected = true;
    }
    let optionTag2 = document.createElement("option");
    if (currency == "USD") {
      optionTag2.selected = true;
    }

    optionTag1.textContent = currency;
    optionTag2.textContent = currency;

    selectTag1.appendChild(optionTag1);
    selectTag2.appendChild(optionTag2);
  });

}

getAvailableCurrencies();


const buttonTag = document.getElementById("myButton");
buttonTag.addEventListener("click", showData);

const pTag = document.getElementById("result");

async function fetchData(url) {
  const baseUrl = "https://api.frankfurter.";
  const requestUrl = baseUrl + url; // = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

async function convert(fromCurrency, toCurrency, amount) {
  const url = `app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
  const data = await fetchData(url);
  return data;
}

async function showData() {
  const fromCurrency = document.getElementById("from").value;
  const toCurrency = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  const data = await convert(fromCurrency, toCurrency, amount);

  pTag.textContent = data?.rates[toCurrency];
}
