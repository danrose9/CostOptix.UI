const logger = (store) => (next) => (action) => {
  if (process.env.REACT_APP_ENV === 'production') return next(action);

  let result = next(action);
  console.group(action.type);
  console.info('dispatching', action);

  console.log('next state', store.getState());
  console.groupEnd();

  return result;
};

export default logger;
