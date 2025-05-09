import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api'; // Axios instance with baseURL
import { useTranslation } from 'react-i18next'; // Import useTranslation

const PropertyCardsPublic = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust based on where you store the token

        const res = await API.get('/properties', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const propertyData = Array.isArray(res.data) ? res.data : res.data.properties || [];
        setProperties(propertyData);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error("API Error:", err);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties =
    selectedCity === 'All'
      ? properties
      : properties.filter((property) =>
          property.location?.toLowerCase().includes(selectedCity.toLowerCase())
        );

  return (
    <div className="container-xxl py-5">
      <div className="container">
        {/* Title */}
        <div className="text-center mx-auto mb-4">
          <h1 className="mb-3">{t('explore_title')}</h1> {/* Use translation here */}
        </div>

        {/* City Filter Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          {['All', 'Dubai', 'Abu Dhabi', 'Sharjah'].map((city) => (
            <button
              key={city}
              className={`btn border rounded-pill px-4 py-2 ${
                selectedCity === city ? 'text-white fw-bold' : 'bg-light text-dark'
              }`}
              style={{
                backgroundColor: selectedCity === city ? '#A56ABD' : '',
                borderColor: '#A56ABD',
                fontSize: '16px',
              }}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        {/* Properties */}
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-4">
              {filteredProperties.length > 0 ? (
                filteredProperties.slice(0, 4).map((property) => (
                  <div key={property._id} className="col-xl-3 col-lg-4 col-md-6">
                    <Link to={`/propertydetail/${property._id}`} className="text-decoration-none">
                      <div
                        className="property-item rounded overflow-hidden shadow-sm d-flex flex-column h-100"
                        style={{ backgroundColor: '#ffffff' }}
                      >
                        <div style={{ padding: '20px' }}>
                          <img
                            src={`http://localhost:3001/${property.images?.[0]?.replace(/\\/g, '/')}`}
                            alt="Property"
                            className="img-fluid rounded mb-3 d-block mx-auto"
                            style={{
                              objectFit: 'cover',
                              height: '200px',
                              width: '100%',
                            }}
                          />
                        </div>

                        <div className="px-3 pb-3 d-flex flex-column flex-grow-1 justify-content-between">
                          <div>
                            <div className="h6 mb-1">{property.name}</div>
                            <p>
                              <i className="fa fa-map-marker-alt me-2" style={{ color: '#A56ABD' }} />
                              {property.location}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mt-3">
                            {/* Rent */}
                            <div className="text-center p-2 bg-light rounded w-100 mx-1 shadow-sm">
                              <div style={{ color: '#A56ABD', fontWeight: 'bold', fontSize: '14px' }}>
                                {property.rent}
                              </div>
                            </div>

                            {/* Bed & Bath */}
                            <div className="text-center p-2 bg-light rounded w-100 mx-1 shadow-sm d-flex justify-content-center align-items-center gap-3">
                              <div className="d-flex align-items-center gap-1">
                                <i className="fa fa-bed" style={{ color: '#A56ABD' }}></i>
                                <span style={{ fontSize: '14px' }}>{property.bed}</span>
                              </div>
                              <div className="d-flex align-items-center gap-1">
                                <i className="fa fa-bath" style={{ color: '#A56ABD' }}></i>
                                <span style={{ fontSize: '14px' }}>{property.bath}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-center">{t('no_properties')}</p> 
              )}
            </div>

            <div className="col-12 text-center mt-4">
              <Link to="/propertylist" className="btn py-3 px-5" style={{ backgroundColor: '#A56ABD', color: 'white' }}>
                {t('browse_more')} {/* Use translation here */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardsPublic;
