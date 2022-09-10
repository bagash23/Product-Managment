export const Product = (state = "", action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return action.payload;
    case "CREATE_PRODUCT":
      return action.payload;
    default:
      return state;
  }
};
