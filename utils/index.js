const fetch = require('node-fetch');

const URLParameterBuilder = params => {
    return params.join(';');
};

const setExpirationDate = obj => {
    const now = new Date();
    now.setHours(now.getHours() + 24);
    obj.expirationDate = now.getTime();
};

const isExpired = obj => {
    return new Date().getTime() > obj.expirationDate;
};

const request = async URL => {
    const res = await fetch(URL);
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
};

const errorMiddleware = fn => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (e) {
            throw e;
        }
    }
};

module.exports = {
    URLParameterBuilder,
    request,
    setExpirationDate,
    isExpired,
    errorMiddleware
};