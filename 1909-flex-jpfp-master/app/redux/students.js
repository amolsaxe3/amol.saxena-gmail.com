import { combineReducers } from "redux";

const initialState = {
  students: [],
  selectedStudent: {}
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "SET_STUDENTS":
      newState.students = action.students;
      break;

    case "SELECT_STUDENT":
      newState.selectedStudent = action.student;
      break;

    case "ADD_STUDENT":
      newState.students.push(action.campus);
      break;

    case "DELETE_STUDENT":
      newState.students = newState.students.filter(
        student => student.id !== action.id
      );
      break;

    default:
      break;
  }
  return newState;
};
