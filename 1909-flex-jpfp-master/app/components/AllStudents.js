import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import AddStudent from "./AddStudent";
import {
  fetchStudents,
  deleteStudent,
  postStudent
} from "../redux/actions/students";

export class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: props.students,
      firstName: "",
      lastName: "",
      email: "",
      gpa: undefined,
      campusId: undefined,
      campuses: this.props.campuses,
      isAddStudent: false
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGpaChange = this.handleGpaChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleStudentAddFormSubmit = this.handleStudentAddFormSubmit.bind(
      this
    );
    this.handleClickAddStudent = this.handleClickAddStudent.bind(this);
    this.handleClickCancelAddStudent = this.handleClickCancelAddStudent.bind(
      this
    );
    this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
  }

  componentDidMount() {
    this.props.onLoadStudents();
    this.setState({ students: this.props.students });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      students: nextProps.students,
      campuses: nextProps.campuses
    });
  }

  handleDeleteStudent(id) {
    this.props.onDeleteStudent(id);
  }

  handleClickAddStudent() {
    this.setState({ isAddStudent: true });
  }

  handleClickCancelAddStudent() {
    this.setState({ isAddStudent: false });
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleGpaChange(e) {
    this.setState({ gpa: e.target.value });
  }

  handleCampusChange(e) {
    this.setState({ campusId: e.target.value });
  }

  handleStudentAddFormSubmit() {
    this.setState({ isAddStudent: false });
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      gpa: undefined,
      campusId: undefined
    });
    this.props.onAddStudent({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      gpa: this.state.gpa,
      campusId: this.state.campusId
    });
  }

  render() {
    return (
      <div>
        <Nav />
        {this.state.isAddStudent && (
          <AddStudent
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            gpa={this.state.gpa}
            campusId={this.state.campusId}
            campuses={this.state.campuses}
            handleFirstNameChange={this.handleFirstNameChange}
            handleLastNameChange={this.handleLastNameChange}
            handleEmailChange={this.handleEmailChange}
            handleGpaChange={this.handleGpaChange}
            handleCampusChange={this.handleCampusChange}
            handleFormSubmit={this.handleStudentAddFormSubmit}
            handleClickCancel={this.handleClickCancelAddStudent}
          />
        )}
        <div className="flex-container">
          <h1>Student Listing</h1>
          <button
            type="button"
            className="addButton"
            onClick={this.handleClickAddStudent}
          >
            Add Student
          </button>
        </div>
        <div className="flex-container">
          {this.state.students.length > 0 ? (
            this.state.students.map(student => {
              return (
                <div key={student.id} style={{ padding: "20px" }}>
                  <Link to={`/students/${student.id}`}>
                    <img className="campus-image" src={student.imageUrl} />
                  </Link>
                  <div>
                    <span className="name-span">{student.firstName}</span>{" "}
                    <span>{student.lastName}</span>
                  </div>
                  <button
                    type="button"
                    className="edit-button"
                    style={{ color: "red" }}
                    onClick={() => this.handleDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    students: state.studentState.students,
    campuses: state.campusState.campuses
  };
};

const mapDispatch = (dispatch, props) => ({
  onDeleteStudent: id => {
    dispatch(deleteStudent(id));
  },
  onAddStudent: student => {
    dispatch(postStudent(student));
  },
  onLoadCampuses: () => {
    dispatch(fetchCampuses());
  },
  onLoadStudents: () => {
    dispatch(fetchStudents());
  }
});

export default connect(mapState, mapDispatch)(AllStudents);
