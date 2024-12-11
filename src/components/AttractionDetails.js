// src/components/AttractionDetails.js
import React from 'react';

const AttractionDetails = ({ attraction }) => {
  return (
    <div className="attraction-details">
      <h3>{attraction.name}</h3>
      <p>{attraction.description}</p>
    </div>
  );
};

export default AttractionDetails;
