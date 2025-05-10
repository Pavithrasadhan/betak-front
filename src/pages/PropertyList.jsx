import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../utils/api';
import Search from '../components/Search';
import MainFooter from '../components/MainFooter';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertyList = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/properties', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const propertyData = Array.isArray(res.data) ? res.data : res.data.properties || [];
        setProperties(propertyData);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSaveClick = async (propertyId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.info('Login to save this property');
      return;
    }

    try {
      await API.post(
        `/user/favorites`,
        { propertyId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSavedProperties((prevState) => ({
        ...prevState,
        [propertyId]: true,
      }));

      toast.success('Property saved to your favorites!');
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to save property. Try again later.');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div>
      <div style={{ marginTop: '30px' }}>
        <Navbar />
        <hr />
        <Search />
        <hr />
      </div>

      <div style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <div className="container mb-2">
          {error && <p className="text-danger text-center">{t('error')}: {error}</p>}

          <div className="row">
            {properties.map((property) => (
              <div key={property._id} className="col-12 col-md-4 d-flex justify-content-center">
                <div className="p-2">
                  <div
                    className="card property-card shadow-sm"
                    onClick={() => navigate(`/propertydetail/${property._id}`)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                      minHeight: '220px',
                      position: 'relative',
                      width: '100%',
                      maxWidth: '350px',
                    }}
                  >
                    {/* Save Icon */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        padding: '8px',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveClick(property._id);
                      }}
                    >
                      <FaHeart color={savedProperties[property._id] ? 'red' : 'gray'} size={18} />
                    </div>

                    <div className="col g-3">
                      <div className="col-md-12">
                        <Slider {...settings}>
                          {property.images && property.images.length > 0 ? (
                            property.images.map((img, index) => (
                              <div key={index} style={{ padding: '5px' }}>
                                <img
                                  src={`https://betak-backend.onrender.com/${img.replace(/\\/g, '/')}`}
                                  alt={`Property ${index + 1}`}
                                  className="img-fluid"
                                  style={{
                                    objectFit: 'cover',
                                    height: '200px',
                                    width: '100%',
                                    borderRadius: '8px',
                                  }}
                                  onError={(e) => {
                                    e.target.src = '/images/fallback-image.jpg';
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            <div style={{ padding: '5px' }}>
                              <img
                                src="/images/fallback-image.jpg"
                                alt="Fallback"
                                className="img-fluid"
                                style={{
                                  objectFit: 'cover',
                                  height: '200px',
                                  width: '100%',
                                  borderRadius: '8px',
                                }}
                              />
                            </div>
                          )}
                        </Slider>
                      </div>

                      <div className="col-md-12">
                        <div className="p-3 d-flex flex-column justify-content-between" style={{ height: '100%' }}>
                          <div>
                            <h5 className="property-price">{property.rent}</h5>
                            <p className="property-name">{property.name}</p>
                            <p className="property-location">
                              <i className="fa fa-map-marker-alt me-2" style={{ color: '#A56ABD' }} />
                              {property.location}
                            </p>
                          </div>
                          <p className="card-text mb-0 mt-3 text-muted">
                            <i className="fa fa-bed me-2" style={{ color: '#A56ABD' }} />{property?.bed || 0} {t('beds')} |{' '}
                            <i className="fa fa-bath me-2" style={{ color: '#A56ABD' }} />{property?.bath || 0} {t('baths')} |{' '}
                            <i className="fa fa-ruler-combined me-2" style={{ color: '#A56ABD' }} />{property?.sqft} {t('sqft')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  );
};

export default PropertyList;
