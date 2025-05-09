import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../utils/api';
import { useTranslation } from 'react-i18next';

const EditAmenities = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmenity = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get(`/amenities/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const amenity = response.data;
        setName(amenity.name);
        setIcon(amenity.icon);
      } catch (err) {
        console.error('Error fetching amenity:', err);
        setError(t('fetchAmenityFailed'));
      }
    };

    fetchAmenity();
  }, [id, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(t('requiredAmenityName'));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await API.put(`/amenities/${id}`, { name, icon }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        navigate('/amenities');
      }
    } catch (err) {
      console.error('Edit Amenity Error:', err);
      const errorMessage = err.response?.data?.message || t('updateAmenityFailed');
      setError(errorMessage);
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <h2>{t('editAmenity')}</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group d-flex align-items-center">
          <label htmlFor="name" className="mr-2">{t('amenityName')}</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-cogs" />
              </span>
            </div>
            <input
              type="text"
              id="icon"
              className="form-control"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder={t('enterAmenityIcon')}
            />
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('enterAmenityName')}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {t('updateAmenity')}
        </button>
      </form>
    </div>
  );
};

export default EditAmenities;
