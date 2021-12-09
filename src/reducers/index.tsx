import { combineReducers } from "redux";
import videoReducer from "./video";
import commentReducer from "./comment";

const allReducers = combineReducers({videoReducer, commentReducer});

export default allReducers;