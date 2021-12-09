const videoReducer = (state = "", action) => {
  switch (action.type) {
    case "TERM_SET":
      return action.payload;
    default:
      return state;
  }
};

export default videoReducer;
