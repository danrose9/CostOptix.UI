const logger = (store) => (next) => (action) => {
  const env = process.env.REACT_APP_ENV;

  let result = next(action);

  if (env !== 'production') {
    console.group(action.type);
    console.info('dispatching', action);

    console.log('next state', store.getState());
    console.groupEnd();
  }
  return result;
};

export default logger;
