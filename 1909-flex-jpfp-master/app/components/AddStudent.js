import React from "react";

const AddStudent = props => (
  <form className="single-page-container" onSubmit={props.handleFormSubmit}>
    <h1>New Student Form</h1>
    <label>First Name: </label>
    <input
      value={props.firstName}
      onChange={e => props.handleFirstNameChange(e)}
    />{" "}
    <br />
    <label>Last Name: </label>
    <input
      value={props.lastName}
      onChange={e => props.handleLastNameChange(e)}
    />{" "}
    <br />
    <label>Email: </label>
    <input
      value={props.email}
      onChange={e => props.handleEmailChange(e)}
    />{" "}
    <br />
    <label>GPA: </label>
    <input value={props.gpa} onChange={e => props.handleGpaChange(e)} /> <br />
    <label>Campus: </label>
    <select
      name="campus"
      value={props.campusId}
      onChange={e => props.handleCampusChange(e)}
    >
      <option value="">Choose a campus</option>
      {props.campuses &&
        props.campuses.map(campus => {
          return (
            <option key={campus.name} value={campus.id} label={campus.name}>
              {campus.name}
            </option>
          );
        })}
    </select>
    <br />
    <div className="flex-container-campus">
      <button className="addButton" onClick={props.handleFormSubmit}>
        Save changes
      </button>
      <button className="addButton" onClick={props.handleClickCancel}>
        Cancel
      </button>
    </div>
  </form>
);
export default AddStudent;
