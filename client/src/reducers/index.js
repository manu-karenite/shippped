import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer.js";
import cartReducer from "../reducers/cartReducer.js";
import drawerReducer from "../reducers/drawerReducer.js";
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  drawer: drawerReducer,
});

export default rootReducer;
