export const searchActionTypes = {
  CLEAN_QUERY: 'CLEAN_QUERY',
  START_SEARCH: 'START_SEARCH',
  FINISH_SEARCH: 'FINISH_SEARCH',
  UPDATE_SELECTION: 'UPDATE_SELECTION',
} as const;

export const initialState = {
  loading: false,
  documents: [],
  results: [],
  value: '',
};

type actionType = {
  type: keyof typeof searchActionTypes;
  query?: string;
  results?: any;
  selection?: any;
};

export const searchReducer = (state: typeof initialState, action: actionType) => {
  switch (action.type) {
    case searchActionTypes.CLEAN_QUERY:
      return initialState;
    case searchActionTypes.START_SEARCH:
      return { ...state, loading: true, value: action.query };
    case searchActionTypes.FINISH_SEARCH:
      return { ...state, loading: false, results: action.results };
    case searchActionTypes.UPDATE_SELECTION:
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
};
