import axios from "axios";

export const setStudents = students => {
  return {
    type: "SET_STUDENTS",
    students: students
  };
};

export const selectStudent = student => {
  return {
    type: "SELECT_STUDENT",
    student: student
  };
};

export const fetchStudents = () => {
  return async dispatch => {
    const students = (await axios.get("/api/students")).data;
    dispatch(setStudents(students));
  };
};

export const fetchSelectedStudent = id => {
  return async dispatch => {
    const student = (await axios.get(`/api/students/${id}`)).data;
    dispatch(selectStudent(student));
  };
};

export const addStudentAction = student => {
  return {
    type: "ADD_STUDENT",
    student
  };
};

export const postStudent = student => {
  console.log("inside postStudent");
  return async dispatch => {
    const addedStudent = (await axios.post("/api/students", student)).data;
    dispatch(addStudentAction(addedStudent));
    dispatch(fetchStudents());
  };
};

export const deleteStudentAction = id => {
  return {
    type: "DELETE_STUDENT",
    id
  };
};

export const deleteStudent = id => {
  return async dispatch => {
    const deletedStudent = (await axios.delete(`/api/students/${id}`)).data;
    dispatch(deleteStudentAction(id));
    dispatch(fetchStudents());
  };
};

export const editStudent = student => {
  console.log("student in editstudent action: ", student);
  return async dispatch => {
    const editedStudent = (
      await axios.put(`/api/students/${student.id}`, student)
    ).data;
    dispatch(fetchSelectedStudent(student.id));
  };
};
