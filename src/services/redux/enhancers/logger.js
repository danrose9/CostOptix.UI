const logger = (store) => (next) => (action) => {
  const enableLogger = process.env.REACT_APP_ENABLE_REDUX_LOGGER;
  let result = next(action);

  if (enableLogger) {
    console.group(action.type);
    console.info('dispatching', action);

    console.log('next state', store.getState());
    console.groupEnd();
  }
  return result;
};

export default logger;
