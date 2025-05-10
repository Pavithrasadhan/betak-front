import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { useTranslation } from 'react-i18next';

const AmenitiesTable = () => {
  const { t } = useTranslation();
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/amenities', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = Array.isArray(res.data) ? res.data : res.data.amenities || [];
        setAmenities(data);
      } catch (err) {
        setError(t('fetchError'));
        console.error("API Error:", err);
      }
    };

    fetchAmenities();
  }, [t]);

  const deleteAmenity = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/amenities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAmenities(amenities.filter((amenity) => amenity._id !== id));
    } catch (err) {
      console.error('Delete Error:', err);
      setError(t('deleteError'));
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{t('amenities')}</h2>
        <Link to="/amenities/addamenities" className="btn btn-primary">
          + Add Amenity
        </Link>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>{t('icon')}</th>
              <th>{t('name')}</th>
              <th>{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(amenities) && amenities.length > 0 ? (
              amenities.map((amenity, idx) => (
                <tr key={amenity._id}>
                  <td>{idx + 1}</td>
                  <td>{amenity.icon}</td>
                  <td>{amenity.name}</td>
                  <td>
                    <Link
                      to={`/amenities/editamenities/${amenity._id}`}
                      className="btn btn-warning btn-sm"
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      <i className="fas fa-edit" />
                    </Link>
                    <button
                      onClick={() => deleteAmenity(amenity._id)}
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
                <td colSpan="4" className="text-center">{t('noAmenities')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmenitiesTable;
