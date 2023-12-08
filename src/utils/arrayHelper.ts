import { IRootState } from 'src/services/redux/rootReducer';
import { formatDateToShort } from './helper';

function validateValue(num: number) {
  return typeof num === 'number' && !isNaN(num) ? num : 0;
}

export function computeNewValue(arrayItem: any, newObj: any, provider: string) {
  const computedValue = validateValue(arrayItem[provider]) + validateValue(newObj[provider]);

  const formattedNumber = parseFloat(computedValue.toFixed(2));
  return isNaN(formattedNumber) ? 0 : formattedNumber;
}

/// <summary>
/// Combines payload with state.data and sorts by sortBy property
/// Returns a limited array based on limit
/// </summary>
export const combineSortSliceArray = (
  state: IRootState,
  payload: any,
  slice: string,
  sortBy: string,
  limit: number
) => {
  // payload is a single billing account
  const data = state.data;

  // newArray is the array of fastestGrowing or mostExpensive only
  const newArray = payload[slice];

  // add billing account properties to each object in newArray
  const updatedArray = newArray.map((obj: any) => ({
    ...obj,
    accountName: payload.accountName,
    billingAccountId: payload.id,
    provider: payload.provider,
    currency: payload.currency,
    convertedCurrency: payload.convertedCurrency,
  }));

  // combine updatedArray with state.data
  const combinedArray = data.concat(updatedArray);

  const orderedArray = combinedArray.sort((b: any, a: any) => a[sortBy] - b[sortBy]);

  // limitedArray is the first x objects in orderedArray
  const limitedArray = orderedArray.slice(0, limit);

  return limitedArray;
};

/// <summary>
/// Combines payload with state.data and to return a single array by date
/// If isCurrencyConflict is true then use amountConverted
/// </summary>
export const upsert = (array: any, payload: any, isCurrencyConflict: boolean) => {
  const provider = payload.provider;

  // take a copy of original array
  const newArray = [...array];

  // eslint-disable-next-line array-callback-return
  payload.monthlySpend.map((obj: any) => {
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

export const findBillingAccount = (state: IRootState, payload: any) => {
  const { id } = payload;

  return state.billingAccounts.find((item: any) => item.id === id);
};

export const getIndex = (inputArray: any, propertyToCheck: any, valueToFind: any) => {
  let obj = inputArray.find((x: any) => x[propertyToCheck] === valueToFind);

  return inputArray.indexOf(obj);
};
