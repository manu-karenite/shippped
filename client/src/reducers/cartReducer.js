//what would be the initial state ?
//obviously from local storage
let cart = [];

if (window) {
  if (window?.localStorage?.getItem("cart")) {
    cart = JSON.parse(window.localStorage.getItem("cart"));
  }
}

const cartReducer = (state = cart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
