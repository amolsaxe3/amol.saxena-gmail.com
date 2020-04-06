import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSelectedCampus,
  unregisterStudent,
  editDetailViewCampus
} from "../redux/actions/campuses";
import { editStudent } from "../redux/actions/students";
import EditCampus from "./EditCampus";
import Nav from "./Nav";

export class SingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campus: props.campus,
      editedCampusName: props.campus.name,
      editedCampusDescription: props.campus.description,
      editedCampusAddress: props.campus.address,
      isEditMode: false
    };
    this.handleDeleteCampus = this.handleDeleteCampus.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  handleDeleteCampus(id) {
    this.props.onDeleteCampus(id);
  }

  handleClickEdit() {
    this.setState({ isEditMode: true });
  }

  handleNameChange(e) {
    this.setState({ editedCampusName: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ editedCampusAddress: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ editedCampusDescription: e.target.value });
  }

  handleEditFormSubmit() {
    this.setState({ isEditMode: false });
    this.props.onEditCampus({
      id: this.state.campus.id,
      name: this.state.editedCampusName,
      address: this.state.editedCampusAddress,
      description: this.state.editedCampusDescription
    });
  }

  handleClickCancel() {
    this.setState({ isEditMode: false });
  }

  handleUnregisterClick(student, campusId) {
    this.props.onUnregisterStudent(student, campusId);
  }

  componentDidMount() {
    this.props.onLoadCampus();
    this.setState({ campus: this.props.campus });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      campus: nextProps.campus,
      editedCampusAddress: nextProps.campus.address,
      editedCampusDescription: nextProps.campus.description,
      editedCampusName: nextProps.campus.name
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="single-page-container">
          {this.state.isEditMode ? (
            <EditCampus
              name={this.state.editedCampusName}
              address={this.state.editedCampusAddress}
              description={this.state.editedCampusDescription}
              handleNameChange={this.handleNameChange}
              handleAddressChange={this.handleAddressChange}
              handleDescriptionChange={this.handleDescriptionChange}
              handleFormSubmit={this.handleEditFormSubmit}
              handleCancel={this.handleClickCancel}
            />
          ) : (
            <div>
              <h1>Show Campus</h1>
              <div className="flex-container-single-campus">
                <img
                  className="single-campus-image"
                  src={this.state.campus.imageUrl}
                />
                <div className="campus-content">
                  <h2>{this.state.campus.name}</h2>
                  <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                    {this.state.campus.description}
                  </p>
                </div>
              </div>
              <div className="flex-container-campus-buttons">
                <p>{this.state.campus.address}</p>
                <button
                  type="button"
                  onClick={this.handleClickEdit}
                  style={{ color: "green" }}
                  className="edit-button"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
          <h3>Students</h3>
          {this.state.campus.students &&
            this.state.campus.students.map(student => (
              <div key={student.name}>
                <Link to={`/students/${student.id}`}>
                  <span className="name-span">{student.firstName}</span>
                  <span className="name-span">{student.lastName}</span>
                </Link>
                <button
                  type="button"
                  className="edit-button"
                  style={{ color: "tomato", backgroundColor: "black" }}
                  onClick={() =>
                    this.handleUnregisterClick(
                      { id: student.id, campusId: null },
                      this.state.campus.id
                    )
                  }
                >
                  Unregister
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    campus: state.campusState.selectedCampus
  };
};

const mapDispatch = (dispatch, props) => {
  const { id } = props.match.params;
  return {
    onLoadCampus: () => {
      dispatch(fetchSelectedCampus(id));
    },
    onUnregisterStudent: (student, campusId) => {
      dispatch(unregisterStudent(student, campusId));
    },
    onEditCampus: campus => {
      dispatch(editDetailViewCampus(campus));
    }
  };
};

export default connect(mapState, mapDispatch)(SingleCampus);
