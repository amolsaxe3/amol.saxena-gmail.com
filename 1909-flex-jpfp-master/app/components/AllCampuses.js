import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../style.css";
import Nav from "./Nav";
import AddCampus from "./AddCampus";
import {
  deleteCampus,
  editCampus,
  postCampus
} from "../redux/actions/campuses";

export class AllCampuses extends React.Component {
  constructor(props) {
    super(props);
    //console.log('props here in AllCampuses: ', props)
    this.state = {
      campuses: props.campuses,
      // editedCampus: {},
      editedCampusName: undefined,
      editedCampusId: undefined,
      editedCampusDescription: undefined,
      editedCampusAddress: undefined,
      isAddCampus: false,
      campusName: "",
      campusAddress: "",
      campusDescription: ""
    };
    this.handleDeleteCampus = this.handleDeleteCampus.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleEditCampus = this.handleEditCampus.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.handleCancelEditCampus = this.handleCancelEditCampus.bind(this);
    this.handleAddCampusClick = this.handleAddCampusClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
  }

  handleDeleteCampus(id) {
    this.props.onDeleteCampus(id);
  }

  handleEditCampus(campusId) {
    // this.setState({editedCampus: {id: campusId}})
    this.setState({ editedCampusId: campusId });
  }

  handleNameChange(e, id) {
    // this.setState({editedCampus: Object.assign({}, this.state.editedCampus, {name: e.target.value})});
    this.setState({ editedCampusName: e.target.value });
  }

  handleAddressChange(e, id) {
    // this.setState({editedCampus: Object.assign({}, this.state.editedCampus, {address: e.target.value})});
    this.setState({ editedCampusAddress: e.target.value });
  }

  handleDescriptionChange(e, id) {
    // this.setState({editedCampus: Object.assign({}, this.state.editedCampus, {description: e.target.value})});
    this.setState({ editedCampusDescription: e.target.value });
  }

  handleEditFormSubmit() {
    this.setState({
      editedCampusName: undefined,
      editedCampusId: undefined,
      editedCampusDescription: undefined,
      editedCampusAddress: undefined
    });
    this.props.onEditCampus({
      id: this.state.editedCampusId,
      name: this.state.editedCampusName,
      address: this.state.editedCampusAddress,
      description: this.state.editedCampusDescription
    });
  }

  handleCancelEditCampus() {
    this.setState({
      editedCampusName: undefined,
      editedCampusId: undefined,
      editedCampusDescription: undefined,
      editedCampusAddress: undefined
    });
  }

  handleAddCampusClick() {
    this.setState({ isAddCampus: true });
  }

  handleAddCampusCancelClick() {
    this.setState({ isAddCampus: false });
  }

  handleNameChange(e) {
    this.setState({ campusName: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ campusAddress: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ campusDescription: e.target.value });
  }

  handleAddFormSubmit() {
    this.setState({ isAddCampus: false });
    this.props.onAddCampus({
      name: this.state.campusName,
      address: this.state.campusAddress,
      description: this.state.campusDescription
    });
  }

  componentDidMount() {
    // this.props.onLoadCampuses();
    this.setState({ campuses: this.props.campuses });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ campuses: nextProps.campuses });
  }

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Nav />
        {this.state.isAddCampus && (
          <AddCampus
            handleNameChange={this.handleNameChange}
            handleAddressChange={this.handleAddressChange}
            handleDescriptionChange={this.handleDescriptionChange}
            handleFormSubmit={this.handleAddFormSubmit}
            handleClickCancel={this.handleAddCampusCancelClick}
          />
        )}
        <div className="flex-container">
          <h1>Campus Listing</h1>
          <button
            type="button"
            onClick={this.handleAddCampusClick}
            className="addButton"
          >
            Add Campus
          </button>
        </div>
        <div className="flex-container">
          {this.state.campuses.length > 0 ? (
            this.state.campuses.map(campus => (
              <div key={campus.id} className="each-campus">
                <div className="flex-container-campus">
                  <Link to={`/campuses/${campus.id}`}>
                    <img className="campus-image" src={campus.imageUrl} />
                  </Link>
                  <div className="campus-content">
                    <h3>{campus.name} </h3>
                    <p>{campus.description}</p>
                    <div className="flex-container-campus-buttons">
                      <Link to={`/campuses/${campus.id}`}>
                        <button
                          type="button"
                          className="edit-button"
                          style={{ color: "green" }}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="edit-button"
                        style={{ color: "red" }}
                        onClick={() => this.handleDeleteCampus(campus.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
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
    campuses: state.campusState.campuses
  };
};

const mapDispatch = (dispatch, props) => ({
  onDeleteCampus: id => {
    dispatch(deleteCampus(id));
  },
  onEditCampus: campus => {
    dispatch(editCampus(campus));
  },
  onAddCampus: campus => {
    dispatch(postCampus(campus));
  }
});

export default connect(mapState, mapDispatch)(AllCampuses);
