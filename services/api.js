const {URLParameterBuilder, request} = require('../utils');

const getAllFields = ['name', 'alpha2Code', 'flag'];
const getFields = [...getAllFields, 'capital', 'region', 'subregion', 'latlng', 'timezones', 'currencies', 'languages'];
const getAllURLParameters = URLParameterBuilder(getAllFields);
const getURLParameters = URLParameterBuilder(getFields);
const baseURL = 'https://restcountries.eu/rest/v2';

const getAll = () => {
    return request(`${baseURL}/all?fields=${getAllURLParameters}`);
};

const get = code => {
    return request(`${baseURL}/alpha/${code}?fields=${getURLParameters}`);
};

module.exports = {
    getAll,
    get
};