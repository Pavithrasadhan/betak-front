import React from 'react';
import { Link } from 'react-router-dom';

const UserSavedProperties = ({ savedProperties, onDelete }) => {
  if (savedProperties.length === 0) {
    return <p className="text-center">You don't have any saved properties yet.</p>;
  }

  return (
    <div className="row">
      {savedProperties.map((property) => (
        <div key={property._id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{property.name}</h5>
              <p className="card-text">{property.description.slice(0, 100)}...</p>
              <div className="d-flex justify-content-between">
                <Link to={`/propertydetail/${property._id}`} className="btn btn-primary me-2">
                  View Property
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSavedProperties;
