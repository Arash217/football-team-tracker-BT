const api = require('./api');
const cache = require('./cache');
const {errorMiddleware, setExpirationDate, isExpired} = require('../utils');

let countriesCached = false;

const getAll = errorMiddleware(async () => {
    if (countriesCached) {
        return cache.getCountries();
    }

    const countries = await api.getAll();
    countriesCached = true;
    cache.setCountries(countries);

    return cache.getCountries();
});

const get = errorMiddleware(async code => {
    const cachedCountry = cache.getCountry(code);

    if (cachedCountry != null && cachedCountry.expirationDate && !isExpired(cachedCountry)) {
        return cachedCountry;
    }

    const country = await api.get(code);
    setExpirationDate(country);
    cache.addCountry(country);

    return country;
});

module.exports = {
    getAll,
    get
};
