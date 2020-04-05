import React from 'react';
import SingleStudent from './SingleStudent';

const SingleCampus = props => {
  return (
    <div>
        <h2>{props.campus.name}</h2> 
        {props.students.map((student, idx) => {
            return (<SingleStudent key = {idx} student={student}/>)
            })
        }
    </div>
    );
};


export default SingleCampus;
