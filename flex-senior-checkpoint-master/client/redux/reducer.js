import { SET_CAMPUSES, SELECT_CAMPUS, ADD_CAMPUS } from './constants';

const initialState = {
  campuses: [],
  selectedCampus: {},
  students: []
};

export default (state = initialState, action) => {
	const newState = Object.assign({}, state);

	switch (action.type) {
	case SET_CAMPUSES: 
	newState.campuses = action.campuses;
	break;
	
	case SELECT_CAMPUS: 
	newState.selectedCampus = action.campus;
	break;
	
	case ADD_CAMPUS: 
	newState.campuses.push(action.campus);
    break;
	}

	
	return newState;
};
