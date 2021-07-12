import { combineReducers } from "redux";
import setUserReducer from "./setUser";

const allReducers= combineReducers({
    user: setUserReducer
})

export default allReducers