import React from "react";

const AddCampus = props => (
  <div className="add-campus-form">
    <form onSubmit={props.handleFormSubmit}>
      <h1>New Campus Form</h1>
      <div className="flex-container-campus">
        <label>Name: </label>
        <input
          value={props.campusName}
          onChange={e => props.handleNameChange(e)}
        />
      </div>
      <div className="flex-container-campus">
        <label>Address: </label>
        <input
          value={props.campusAddress}
          onChange={e => props.handleAddressChange(e)}
        />
      </div>
      <div className="flex-container-campus">
        <label>Description: </label>
        <textarea
          value={props.campusDescription}
          onChange={e => props.handleDescriptionChange(e)}
        />
      </div>
      <div className="flex-container-campus">
        <button
          type="button"
          className="addButton"
          onClick={props.handleFormSubmit}
        >
          Save Changes
        </button>
        <button
          type="button"
          className="addButton"
          onClick={props.handleClickCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

export default AddCampus;
