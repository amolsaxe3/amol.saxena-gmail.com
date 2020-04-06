import { combineReducers } from "redux";
import { LOAD_ALL_CAMPUSES } from "./actions";

const initialState = {
  campuses: [],
  selectedCampus: {}
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "LOAD_ALL_CAMPUSES":
      // console.log('inside the reducer: ', action.campuses);
      newState.campuses = action.campuses;
      break;

    case "SET_CAMPUSES":
      newState.campuses = action.campuses;
      break;

    case "SELECT_CAMPUS":
      newState.selectedCampus = action.selectedCampus;
      break;

    case "ADD_CAMPUS":
      newState.campuses.push(action.campus);
      break;

    case "DELETE_CAMPUS":
      newState.campuses = newState.campuses.filter(
        campus => campus.id !== action.id
      );
      break;

    default:
      break;
  }
  return newState;
};
