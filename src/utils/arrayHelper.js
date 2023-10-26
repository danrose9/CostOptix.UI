import { formatDateToShort } from './helper';

function validateValue(num) {
  return typeof num === 'number' && !isNaN(num) ? num : 0;
}

export function computeNewValue(arrayItem, newObj, provider) {
  const computedValue = validateValue(arrayItem[provider]) + validateValue(newObj[provider]);

  const formattedNumber = parseFloat(computedValue.toFixed(2));
  return isNaN(formattedNumber) ? 0 : formattedNumber;
}

/// <summary>
/// Combines payload with state.data and sorts by sortBy property
/// Returns a limited array based on limit
/// </summary>
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

/// <summary>
/// Combines payload with state.data and to return a single array by date
/// If isCurrencyConflict is true then use amountConverted
/// </summary>
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
      const validatedResult = computeNewValue(newArray[objectToUpdateIndex], newObject, provider);

      // check to see if provider is in the object
      if (provider in newArray[objectToUpdateIndex]) {
        // update existing provider with validatedResult
        const updatedObject = {
          ...newArray[objectToUpdateIndex],
          [provider]: validatedResult,
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
