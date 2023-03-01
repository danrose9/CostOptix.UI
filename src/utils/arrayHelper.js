import { formatDateToShort } from './helper';

export const combineSortSliceArray = (state, payload, slice, sortBy, limit) => {
  const data = state.data;
  const newArray = payload[slice];

  const updatedArray = newArray.map((obj) => ({
    ...obj,
    accountName: payload.accountName,
    billingAccountId: payload.id,
    provider: payload.provider,
    currency: payload.currency,
    convertedCurrency: payload.convertedCurrency,
  }));

  const combinedArray = data.concat(updatedArray);
  const orderedArray = combinedArray.sort((a, b) => b[sortBy] - a[sortBy]);

  const limitedArray = orderedArray.slice(0, limit);

  return limitedArray;
};

export const upsert = (array, payload, isCurrencyConflict) => {
  const provider = payload.provider;

  // take a copy of original array
  const newArray = [...array];

  // eslint-disable-next-line array-callback-return
  payload.monthlySpend.map((obj) => {
    let amount = obj.amount;
    if (isCurrencyConflict) {
      amount = obj.amountConverted;
    }

    const newObject = {
      [provider]: amount,
      name: formatDateToShort(obj.periodEnd),
    };

    // check to see if month aleady exists..
    const objectToUpdateIndex = newArray.findIndex((element) => {
      return element.name === newObject.name;
    });

    if (objectToUpdateIndex > -1) {
      // add old provider value to new provider value
      const newValue = newArray[objectToUpdateIndex][provider] + newObject[provider];

      // check to see if provider is in the object
      if (provider in newArray[objectToUpdateIndex]) {
        // update existing provider with newValue
        const updatedObject = {
          ...newArray[objectToUpdateIndex],
          [provider]: newValue,
        };
        newArray[objectToUpdateIndex] = updatedObject;
      } else {
        // add provider to object
        const newObject = {
          ...newArray[objectToUpdateIndex],
          [provider]: amount,
        };
        newArray[objectToUpdateIndex] = newObject;
      }
    } else {
      // .. if not then push to array
      newArray.push(newObject);
    }
  });

  return newArray;
};

export const findBillingAccount = (state, payload) => {
  const { id } = payload;

  return state.billingAccounts.find((item) => item.id === id);
};

export const getIndex = (inputArray, propertyToCheck, valueToFind) => {
  let obj = inputArray.find((x) => x[propertyToCheck] === valueToFind);

  return inputArray.indexOf(obj);
};
