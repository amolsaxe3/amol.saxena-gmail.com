import React from "react";

const EditCampus = props => (
  <form onSubmit={props.handleFormSubmit}>
    <h1>Edit Campus </h1>
    <div className="add-page">
      <label>Campus Name: </label>
      <input value={props.name} onChange={e => props.handleNameChange(e)} />
    </div>
    <div className="add-page">
      <label>Address: </label>
      <input
        value={props.address}
        onChange={e => props.handleAddressChange(e)}
      />
    </div>
    <div className="add-page">
      <label>Description: </label>
      <input
        value={props.description}
        onChange={e => props.handleDescriptionChange(e)}
      />
    </div>
    <div className="flex-container-campus-buttons">
      <button
        type="button"
        className="addButton"
        onClick={props.handleFormSubmit}
      >
        Save Changes
      </button>
      <button type="button" className="addButton" onClick={props.handleCancel}>
        Cancel
      </button>
    </div>
  </form>
);

export default EditCampus;
