module.exports = dateFormat = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}