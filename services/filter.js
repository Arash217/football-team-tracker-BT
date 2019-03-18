const search = (countries, keyword) => {
    return countries.filter(country => country.name.toLowerCase().includes(keyword.toLowerCase()));
};

const sort = (countries, order) => {
    return countries.sort((countryA, countryB) => {
        if (order === 'asc') [countryA, countryB] = [countryB, countryA];
        return countryB.name.localeCompare(countryA.name);
    })
};

module.exports = {
  search,
  sort
};