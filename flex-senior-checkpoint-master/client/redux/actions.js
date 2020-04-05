import axios from 'axios';
import { SET_CAMPUSES, SELECT_CAMPUS, ADD_CAMPUS } from './constants';

// ACTION CREATORS

export const setCampuses = (campuses) => {
  //your code here
  return {
    type: SET_CAMPUSES,
    campuses: campuses,
  };
};



export const selectCampus = (campus) => {
	return {
    type: SELECT_CAMPUS,
    campus: campus,
  };
};

export const addCampus = (starfleetCampus) => {
  return {
    type: ADD_CAMPUS,
    campus: starfleetCampus,
  };
};


