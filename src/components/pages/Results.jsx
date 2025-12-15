import React from "react";
import { Link } from 'react-router-dom'

const Results = ({ photo }) => {
  if (!Array.isArray(photo) || photo.length === 0) {
    return <p>No photo found.</p>;
  }

  return (
    <div className="photo-list">
      {photo.map((singleData, index) => (
        <Link to={`/photo/${singleData.id}`} key={index}>{" "}
          <img src={singleData.urls.regular} alt={singleData.alt_description} />
        </Link>
      ))}
    </div>
  );
};

export default Results;