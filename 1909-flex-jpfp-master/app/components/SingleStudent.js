import React from "react";
import { connect } from "react-redux";
import { fetchSelectedStudent, editStudent } from "../redux/actions/students";
import EditStudent from "./EditStudent";
import Nav from "./Nav";

export class SingleStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: props.student,
      editedFirstName: props.student.firstName,
      editedLastName: props.student.lastName,
      editedEmail: props.student.email,
      editedGpa: props.student.gpa,
      isEditMode: false
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGpaChange = this.handleGpaChange.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  handleClickEdit() {
    this.setState({ isEditMode: true });
  }

  handleFirstNameChange(e) {
    this.setState({ editedFirstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ editedLastName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ editedEmail: e.target.value });
  }

  handleGpaChange(e) {
    this.setState({ editedGpa: e.target.value });
  }

  handleEditFormSubmit() {
    this.setState({ isEditMode: false });
    this.props.onSubmitEditStudent({
      id: this.state.student.id,
      firstName: this.state.editedFirstName,
      lastName: this.state.editedLastName,
      email: this.state.editedEmail,
      gpa: this.state.editedGpa
    });
  }

  handleClickCancel() {
    this.setState({ isEditMode: false });
    // this.setState({editedCampusName: undefined, editedCampusId: undefined, editedCampusDescription: undefined, editedCampusAddress: undefined});
  }

  componentDidMount() {
    this.props.onLoadStudent();
    this.setState({ student: this.props.student });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      student: nextProps.student,
      editedFirstName: nextProps.student.firstName,
      editedLastName: nextProps.student.lastName,
      editedEmail: nextProps.student.email,
      editedGpa: nextProps.student.gpa
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="single-page-container">
          {this.state.isEditMode ? (
            <EditStudent
              firstName={this.state.editedFirstName}
              lastName={this.state.editedLastName}
              gpa={this.state.editedGpa}
              email={this.state.editedEmail}
              handleFirstNameChange={this.handleFirstNameChange}
              handleLastNameChange={this.handleLastNameChange}
              handleEmailChange={this.handleEmailChange}
              handleGpaChange={this.handleGpaChange}
              handleFormSubmit={this.handleEditFormSubmit}
              handleCancel={this.handleClickCancel}
            />
          ) : (
            <div>
              <h1>Show Student</h1>
              <div className="flex-container-single-campus">
                <img
                  className="single-campus-image"
                  src={this.state.student.imageUrl}
                />
                <div className="campus-content">
                  <h2>
                    <span className="name-span">
                      {this.state.student.firstName}
                    </span>
                    <span className="name-span">
                      {this.state.student.lastName}
                    </span>
                  </h2>
                  <p>{this.state.student.email}</p>
                  <p>{this.state.student.gpa}</p>
                  <button
                    className="edit-button"
                    style={{ color: "green" }}
                    type="button"
                    onClick={this.handleClickEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
          <div>
            <h3>This student is registered to the following campus: </h3>
            {this.state.student.campus && (
              <div className="flex-container-single-campus">
                <img
                  className="campus-image"
                  src={this.state.student.campus.imageUrl}
                />
                <div className="campus-content">
                  <h4>{this.state.student.campus.name}</h4>
                  <p>{this.state.student.campus.address}</p>
                  <p>{this.state.student.campus.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    student: state.studentState.selectedStudent
  };
};

const mapDispatch = (dispatch, props) => {
  const { id } = props.match.params;
  return {
    onLoadStudent: () => {
      dispatch(fetchSelectedStudent(id));
    },
    onSubmitEditStudent: student => {
      dispatch(editStudent(student));
    }
  };
};

export default connect(mapState, mapDispatch)(SingleStudent);
