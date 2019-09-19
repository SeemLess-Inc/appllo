const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return Object.assign({}, state, {
        result: action.payload
      });
    default:
      return state;
  }
};
