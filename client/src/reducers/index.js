import { combineReducers } from "redux";
import authReducer from "./authReducer";

console.log(authReducer);
export default combineReducers({
  auth: authReducer
});
