const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return action.payload;
    default:
      return state;
  }
};

export default drawerReducer;
