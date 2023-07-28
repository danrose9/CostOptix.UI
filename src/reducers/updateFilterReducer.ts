export const INITIAL_STATE = [] as any;
export const INTIAL_FILTER = [{ '0': { field: '', operator: '', value: '' } }];

const CONDITIONAL_OPERATOR = {
  AND: 'and',
  OR: 'or',
};

const FIELDS = {
  FIELD: 'field',
  OPERATOR: 'operator',
  VALUE: 'value',
  CONDITIONAL_OPERATOR: 'conditionalOperator',
};

export const updateFilterReducer = (state: any, action: any) => {
  const { value, index } = action.payload;
  switch (action.type) {
    case 'ADD_FILTER':
      /* Responsible for adding a new filter to the state, if index is > 0 then this will also prepend a conditional operator */
      /* Returns the indexed filter that is being modified - {"0":{"field":"BillingAccountId","operator":"gt","value":"bar"}} */

      let key = Object.keys(value);
      let filterIndex = parseInt(key[0]);

      if (filterIndex > 0) {
        const filterWithConditionalOperator = {
          [filterIndex]: { conditionalOperator: CONDITIONAL_OPERATOR.AND, ...value[filterIndex] },
        };
        return [...state, filterWithConditionalOperator];
      }

      return [...state, value];
    case 'UPDATE_FILTER':
      /* Responsible for updating the value of the filter based on the index */
      /* TODO: Replace entire object with value */
      /* TODO: Add conditional operator to filter */
      // console.log('UPDATE_FILTER', action.payload);
      // return state;
      const updatedState = state.map((filterObj: any, i: number) => {
        if (Number(Object.keys(filterObj)[0]) === index) {
          return {
            [index]: value,
          };
        }
        return filterObj;
      });

      console.log('updatedState', updatedState);
      return state;
    case 'UPDATE_CONDITIONAL_OPERATOR':
      /* Responsible for changing the value of the conditional operator based on the index */
      /* TODO: This currently just adds a new empty filter and conditional operator to the state */
      /* TODO: When changing the conditional operator, it should update the existing filter */
      /* TODO: maxIndex is not working as expected */

      const maxIndex = Math.max(...state.map((item: any) => Number(Object.keys(item)[0])));

      // Add the new filter with conditionalOperator to state
      // return [
      //   ...state,
      //   {
      //     [maxIndex + 1]: {
      //       [FIELDS.CONDITIONAL_OPERATOR]: value.conditionalOperator,
      //       [FIELDS.FIELD]: '',
      //       [FIELDS.OPERATOR]: '',
      //       [FIELDS.VALUE]: '',
      //     },
      //   },
      // ];
      console.log('UPDATE_CONDITIONAL_OPERATOR', action.payload);
      return state;
    case 'REMOVE_FILTER':
      /* Responsible for removing the filter based on the index */

      /* Filter out the object that matches the index */
      const filteredArray = state.filter((obj: object) => !obj.hasOwnProperty(value));

      /* Update the Array with a new index from 0 to n */
      const updatedArray = filteredArray.map((obj: { [x: string]: object }, index: number) => {
        const key = Object.keys(obj)[0];
        const newKey = String(index);
        if (key !== newKey) {
          obj[newKey] = obj[key];
          delete obj[key];
        }
        return obj;
      });

      return updatedArray;
    case 'RESET_QUERY':
      /* Responsible for resetting the entire query */
      /* TODO: Reset query to initial state */
      /* TODO: Reset components to original state */
      return value;
    default:
      throw new Error();
  }
};
