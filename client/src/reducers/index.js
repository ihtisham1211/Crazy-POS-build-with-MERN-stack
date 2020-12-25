//list of reducers
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import user from "./user";
import product from "./product";
import checkout from "./checkout";

export default combineReducers({ alert, auth, user, product, checkout });
