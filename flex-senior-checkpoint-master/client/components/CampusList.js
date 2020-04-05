import React from 'react';

export const CampusList = (props) => {
  // your code here
  return (
    <ul>
      {props.campuses.map((campus, idx) => {
        return (<li key = {idx} >{campus.name}</li>)
      })
      }
    </ul>
    );
};

