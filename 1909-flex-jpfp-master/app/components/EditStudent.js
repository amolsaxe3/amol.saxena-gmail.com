import React from "react";

const EditStudent = props => (
  <form onSubmit={props.handleFormSubmit}>
    <h1>Edit Student </h1>
    <div className="add-page">
      <label>First Name: </label>
      <input
        value={props.firstName}
        onChange={e => props.handleFirstNameChange(e)}
      />
    </div>
    <div className="add-page">
      <label>Last Name: </label>
      <input
        value={props.lastName}
        onChange={e => props.handleLastNameChange(e)}
      />
    </div>
    <div className="add-page">
      <label>Email: </label>
      <input value={props.email} onChange={e => props.handleEmailChange(e)} />
    </div>
    <div>
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

export default EditStudent;
