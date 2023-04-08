const logger = (store) => (next) => (action) => {
  let result = next(action);
  console.group(action.type);
  console.info('dispatching', action);

  console.log('next state', store.getState());
  console.groupEnd();

  return result;
};

export default logger;
