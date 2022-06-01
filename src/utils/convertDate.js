const getWeekday = (newDate) => {
    const date = new Date(newDate);
    const options = { weekday: 'long' };
    const dateFormated = date.toLocaleDateString('pt-BR', options).replace('-feira', '');
    return dateFormated.replace(dateFormated[0], dateFormated[0].toUpperCase());
}
const formatDate = (newDate) => {
    const date = new Date(newDate);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

const formatDateEdit = (newDate) => {
    return newDate.slice(0, newDate.indexOf('T'));
}

module.exports = { getWeekday, formatDate, formatDateEdit }