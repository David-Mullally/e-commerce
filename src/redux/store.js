import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import { UserRegisterLoginReducer } from "./reducers/userReducers";

import thunk from "redux-thunk";

const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: UserRegisterLoginReducer,
});

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};
const INITIAL_STATE = {
  cart: {
    value: 0,
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
