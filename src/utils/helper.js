import getSymbolFromCurrency from 'currency-symbol-map';

export function findKeyValue(jsonArray, key) {
  if (typeof jsonArray === 'object') {
    var jsonString = JSON.stringify(jsonArray);
  }
  var js = JSON.parse(jsonString);
  var jsonResult = js[0][key];
  return jsonResult;
}

export function returnJsonString(jsonArray) {
  if (typeof jsonArray === 'object') {
    var jsonString = JSON.stringify(jsonArray);
  }
  var js = JSON.parse(jsonString);
  var jsonResult = js[0];
  return jsonResult;
}

export function getMeDetails(key) {
  var me = sessionStorage.getItem('me');
  var js = JSON.parse(me);
  var jsonResult = js[key];
  return jsonResult;
}

// Get OrganizationId from users/me
export function getOrganizationId() {
  var me = sessionStorage.getItem('me');
  var js = JSON.parse(me);
  var jsonResult = js['organizationId'];
  return jsonResult;
}

export function sessionStorageGetValue(key, innerkey) {
  var storageItem = sessionStorage.getItem(key);
  var js = JSON.parse(storageItem);
  var result = js[innerkey];
  return result;
}

// This function will build a consent Url for a service connection
export function buildConsentUrl(connectionId, organizationId) {
  var baseUrl = 'https://login.microsoftonline.com/';
  var clientId = '885a22bb-5444-444a-9fdb-2c28f2fbea54';
  var redirectUri = process.env.REACT_APP_HOST_REDIRECTURI + '/connections';
  var state = '12345';
  return (
    baseUrl +
    organizationId +
    '.onmicrosoft.com/adminconsent?client_id=' +
    clientId +
    '&state=' +
    state +
    'redirect_uri=' +
    redirectUri
  );
}

// convert date YYYY-MM-DDTHH:mm:ss.SSSSSZ to YYYY-MM-DD
export function formatDate(inputDate) {
  try {
    const convertedDate = new Date(inputDate);
    var formattedDate = convertedDate.toISOString().split('T')[0];
    return formattedDate;
  } catch {
    return null;
  }
}

// convert date YYYY-MM-DD to DD MMMMMMM YYYY
export function formatDateFull(inputDate) {
  try {
    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(5, 7);
    const day = inputDate.substring(8, 10);

    const fullDate = day + ' ' + toMonthName(month, 'long') + ' ' + year;
    return fullDate;
  } catch {
    return null;
  }
}

// convert date YYYY-MM-DD to MMM YYYY
export function formatDateToShort(inputDate) {
  try {
    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(5, 7);

    const shortDate = toMonthName(month, 'short') + ' ' + year;
    return shortDate;
  } catch {
    return null;
  }
}

function toMonthName(monthNumber, option) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: option,
  });
}

export function splitCamelCase(inputString) {
  return inputString.replace(/([a-z](?=[A-Z]))/g, '$1 ');
}

export function getRandomNumber() {
  let min = Math.ceil(1);
  let max = Math.floor(5);
  return Math.floor(Math.random() * (max - min) + min) * 1000;
}

export const roundNumber = (number) => Math.round(number * 100) / 100;

export const currencySymbol = (currency) => {
  let symbol = getSymbolFromCurrency(currency);
  if (symbol == null) {
    return null;
  } else {
    return symbol;
  }
};
