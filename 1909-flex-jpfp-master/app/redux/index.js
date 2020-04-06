import { combineReducers } from "redux";
import campusReducer from "./campuses";
import studentReducer from "./students";

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...
const appReducer = combineReducers({
  campusState: campusReducer,
  studentState: studentReducer
});

export default appReducer;
