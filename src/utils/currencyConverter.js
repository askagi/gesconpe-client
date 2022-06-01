
const coin = (value) => {
    return (value * 100).toFixed(2).replace('.', ',');
}

const decimal = (value) => {
    return (value / 100).toFixed(2).replace('.', ',');
}

module.exports = { coin, decimal }