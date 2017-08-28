import fetch from 'node-fetch';

export default class CurrencyAPI {

    static getLatestRates(base = 'USD') {
        return fetch(`http://api.fixer.io/latest?base=${base}`).then(res => res.json());
    }
}



