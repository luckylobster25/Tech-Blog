module.exports = {
  // Formats date to display correctly passed into handlebars
  setDate: date => {
    dateString = JSON.stringify(date);
    noQuotes = dateString.split('"');
    splitString = noQuotes[1].split('T');
    secondSplit = splitString[1].split('.');
    return (`${splitString[0]}, ${secondSplit[0]}`);
  },
  formatDate: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};