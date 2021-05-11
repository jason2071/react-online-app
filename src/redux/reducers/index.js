import { combineReducers } from "redux";
import profileReducer from "../reducers/profile.reducer";
import cartReducer from "../reducers/cart.reducer";

export default combineReducers({ profileReducer, cartReducer });
