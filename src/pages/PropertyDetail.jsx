import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../utils/api';
import Navbar from '../components/Navbar';
import MainFooter from '../components/MainFooter';
import { useTranslation } from 'react-i18next';
import RentalRequest from '../components/RentalRequest';

const PropertyDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (id) {
      fetchProperties(id);
    }
  }, [id]);

  const fetchProperties = async (id) => {
    try {
      setLoading(true);
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data || {});
      setError('');
    } catch (err) {
      setError('Failed to fetch property');
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = () => {
    const googleMapsUrl = property?.location
      ? `https://www.google.com/maps?q=${encodeURIComponent(property.location)}`
      : "";
    if (googleMapsUrl) {
      window.open(googleMapsUrl, '_blank');
    }
  };

  const formatDescription = (text) => {
    const lines = text.split('\n');
    const chunks = [];

    for (let i = 0; i < lines.length; i += 2) {
      const first = lines[i];
      const second = lines[i + 1] || '';
      chunks.push(`${first}\n${second}`);
    }

    return chunks;
  };

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}: {error}</div>;
  if (!property) return <div>{t('property_not_found')}</div>;

  return (
    <div>
      <Navbar />
      <hr />
      <div className="container mt-4">
        <div>
          <Link to='/propertylist' className="btn mb-3" style={{ fontWeight: 'bold', color: '#A56ABD' }}>
            &lt; {t('back_to_search')}
          </Link>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="d-flex mt-2 flex-wrap">
              {/* Main Image */}
              <div className="position-relative main-image-container" style={{ flex: '1', minWidth: '300px', marginRight: '15px' }}>
                <img
                  src={`https://betak-backend.onrender.com/${property.images[0].replace(/\\/g, '/')}`}
                  alt="Main Property"
                  className="w-100"
                  style={{ maxHeight: '500px', objectFit: 'cover', borderRadius: '10px' }}
                />
                <div
                  onClick={handleMapClick}
                  className="position-absolute"
                  style={{
                    top: '15px',
                    right: '15px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                  title={t('view_on_google_maps')}
                >
                  <i className="fas fa-map-marker-alt fa-lg" style={{ color: '#A56ABD' }} />
                </div>
              </div>

              {/* Additional Images */}
              <div className="d-flex flex-column gap-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {property.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={`https://betak-backend.onrender.com/${img.replace(/\\/g, '/')}`}
                    alt={`Property ${idx + 2}`}
                    className="rounded shadow"
                    style={{ width: '300px', height: 'auto', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-md-9'>
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ fontSize: '30px', fontWeight: 'bold' }}>{property.rent}</span>
              <p className='mb-0 text-end'>
                <i className='fa fa-bed me-2' style={{ color: '#A56ABD' }} /> {property.bed} {t('beds')} |{' '}
                <i className='fa fa-bath me-2' style={{ color: '#A56ABD' }} /> {property.bath} {t('baths')} |{' '}
                <i className='fa fa-ruler-combined me-2' style={{ color: '#A56ABD' }} /> {property.sqft} {t('sqft')}
              </p>
            </div>

            <hr />
            <p className="text-gray-600 mb-0">{property.location}</p>
            <h3 className="text-2xl font-bold mb-4">{property.name}</h3>

            <div className="mb-6">
              <div className="text-gray-700">
                {formatDescription(property.description)
                  .slice(0, showFullDescription ? undefined : 2)
                  .map((chunk, idx) => (
                    <p key={idx} style={{ marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
                      {chunk}
                    </p>
                  ))}
                {formatDescription(property.description).length > 2 && (
                  <button
                    className="btn p-0"
                    onClick={() => setShowFullDescription(prev => !prev)}
                    style={{ color: '#A56ABD', fontWeight: 'bold' }}
                  >
                    {showFullDescription ? t('see_less') : t('see_more')}
                  </button>
                )}
              </div>
            </div>
            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <p><strong>{t('furnishing')}:</strong> {property.furnishing}</p>
            </div>

            <hr />

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">{t('amenities')}</h2>
              <div className="row">
                {property.amenities.map((a, i) => (
                  <div key={i} className="col-6 col-md-3 mb-3">
                    <div className="card shadow-sm h-100 text-center p-3">
                      <i className={`fas ${a.icon} fa-lg mb-2`} style={{ color: '#A56ABD' }} />
                      <p className="mb-0">{a.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr />
          </div>

          <div className='col-md-3'>
            {username ? (
              <RentalRequest property={property} currentUser={{ username }} />
            ) : (
              <div className="card p-3 text-center">
                <p>{t('please_login_to_rent')}</p>
                <Link to="/login" className="btn btn-primary">
                  {t('login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default PropertyDetails;
