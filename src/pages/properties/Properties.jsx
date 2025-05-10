import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api'; 
import { useTranslation } from 'react-i18next'; 

const PropertyTable = () => {
  const { t } = useTranslation(); 
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/properties', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const propertyData = Array.isArray(res.data) ? res.data : res.data.properties || [];
        setProperties(propertyData);
      } catch (err) {
        setError(t('failed_to_fetch'));
        console.error("API Error:", err);
      }
    };

    fetchProperties();
  }, [t]);

  
  const deleteProperty = async (id) => {
    const confirmDelete = window.confirm(t('delete_confirmation')); 
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await API.delete(`/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setProperties(prev => prev.filter(property => property._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      setError(t('failed_to_delete')); 
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{t('all_properties')}</h2> 
        <Link to='/properties/addproperties' className="btn" style={{ background: '#E7DBEF', fontWeight: 'bold', color: 'black'}}>
          {t('add_property')} 
        </Link>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead >
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Bed</th>
              <th>Bath</th>
              <th>Sqft</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((property, idx) => (
                <tr key={property._id}>
                  <td>{idx + 1}</td>
                  <td>
                    {property.images?.length > 0 ? (
                      <img
                        src={`https://betak-backend.onrender.com/${property.images[0].replace(/\\/g,'/')}`}
                        alt="property"
                        width="60"
                        height="50"
                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                      />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{property.name}</td>
                  <td>{property.location}</td>
                  <td>{property.rent}</td>
                  <td>{property.bed}</td>
                  <td>{property.bath}</td>
                  <td>{property.sqft}</td>
                  <td>
                    <Link
                      to={`/properties/editproperties/${property._id}`}
                      className="btn btn-warning btn-sm"
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      <i className="fas fa-edit" />
                    </Link>
                    <button
                      onClick={() => deleteProperty(property._id)}
                      className="btn btn-danger btn-sm"
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      <i className="fas fa-trash" style={{ color: 'red' }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center">{t('no_properties_available')}</td> 
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyTable;
