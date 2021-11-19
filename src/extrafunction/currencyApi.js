const URL = 'https://economia.awesomeapi.com.br/json/all';

const currencyApi = () => (
  fetch(URL)
    .then((response) => response.json())
    .then((result) => result));

export default currencyApi;
