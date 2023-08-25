export const INITIAL_STATE = [] as any;
export const INTIAL_FILTER = [{ '0': { field: '', operator: '', value: '' } }];

const EMPTY_STRING = '';
const CONTAINER_NAME = EMPTY_STRING;
const OWNER = EMPTY_STRING;
const DESCRIPTION = EMPTY_STRING;

export const INITIAL_CONTAINER_STATE = {
  name: CONTAINER_NAME,
  owner: OWNER,
  description: DESCRIPTION,
  query: INTIAL_FILTER,
};

const CONDITIONAL_OPERATOR = {
  AND: 'and',
  OR: 'or',
};

export const updateFilterReducer = (state: any, action: any) => {
  const { value, index } = action.payload;
  switch (action.type) {
    case 'ADD_FILTER':
      /* Responsible for adding a new filter to the state, if index is > 0 then this will also prepend a conditional operator */
      console.log('ADD_FILTER', action.payload);
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
      const updatedFilterState = state.map((filterObj: any, i: number) => {
        if (Number(Object.keys(filterObj)[0]) === index) {
          return {
            [index]: {
              ...filterObj[index],
              ...value,
            },
          };
        }
        return filterObj;
      });

      return updatedFilterState;
    case 'UPDATE_CONDITIONAL_OPERATOR':
      /* Responsible for changing the value of the conditional operator based on the index */
      const updatedConditionalState = state.map((filterObj: any, i: number) => {
        if (Number(Object.keys(filterObj)[0]) === index) {
          return {
            [index]: {
              ...filterObj[index],
              conditionalOperator: value,
            },
          };
        }
        return filterObj;
      });

      return updatedConditionalState;
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
      return value;
    default:
      throw new Error();
  }
};
