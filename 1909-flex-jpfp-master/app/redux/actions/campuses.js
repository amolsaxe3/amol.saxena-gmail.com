import axios from "axios";

export const SET_CAMPUSES = "SET_CAMPUSES";
export const MESSAGES_LOADING = "MESSAGES_LOADING";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const ADD_CAMPUS = "ADD_CAMPUS";
//action is an object that has two properties: type, which is a string that tells the type of action. second argument is payload that is used to update the state by the reducer.
export const setCampuses = campuses => {
  return {
    type: SET_CAMPUSES,
    campuses: campuses
  };
};

export const selectCampus = campus => {
  return {
    type: "SELECT_CAMPUS",
    selectedCampus: campus
  };
};

export const fetchCampuses = campus => {
  return async dispatch => {
    const campuses = (await axios.get("/api/campuses")).data;
    dispatch(setCampuses(campuses));
  };
};

export const fetchSelectedCampus = id => {
  return async dispatch => {
    const campus = (await axios.get(`/api/campuses/${id}`)).data;
    dispatch(selectCampus(campus[0]));
  };
};

export const addCampusAction = campus => {
  return {
    type: "ADD_CAMPUS",
    campus: campus
  };
};

export const postCampus = campus => {
  return async dispatch => {
    const addedCampus = (await axios.post("/api/campuses", campus)).data;
    dispatch(addCampusAction(campus));
    dispatch(fetchCampuses());
  };
};

export const deleteCampusAction = id => {
  return {
    type: "DELETE_CAMPUS",
    id
  };
};

export const deleteCampus = id => {
  return async dispatch => {
    const deletedCampus = (await axios.delete(`/api/campuses/${id}`)).data;
    dispatch(deleteCampusAction(id));
  };
};

export const editCampus = campus => {
  console.log("campus in editCampus action: ", campus);
  return async dispatch => {
    const editedCampus = (await axios.put(`/api/campuses/${campus.id}`, campus))
      .data;
    dispatch(fetchCampuses());
  };
};

export const editDetailViewCampus = campus => {
  console.log("campus in editCampus action: ", campus);
  return async dispatch => {
    const editedCampus = (await axios.put(`/api/campuses/${campus.id}`, campus))
      .data;
    dispatch(fetchSelectedCampus(campus.id));
  };
};

export const unregisterStudent = (student, campusId) => {
  console.log("student in editstudent action: ", student);
  return async dispatch => {
    const editedStudent = (
      await axios.put(`/api/students/${student.id}`, student)
    ).data;
    dispatch(fetchSelectedCampus(campusId));
  };
};
