export default store => next => action => {
  if (action.error) {
    console.group(action.type);
    console.error(action.payload);
    console.groupEnd(action.type);
  }
  return next(action);
};
