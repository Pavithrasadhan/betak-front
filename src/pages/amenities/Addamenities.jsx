import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../../utils/api';

const AddAmenities = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(t('addAmenity.errorNameRequired'));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await API.post('/amenities', { name, icon }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        navigate('/amenities');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || t('addAmenity.errorAdd');
      setError(errorMessage);
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <h2>{t('addAmenity.title')}</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group d-flex align-items-center">
          <label htmlFor="name" className="mr-2">{t('addAmenity.label')}</label>
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
              placeholder={t('addAmenity.placeholderIcon')}
            />
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('addAmenity.placeholderName')}
            />
          </div>
        </div>

        <button type="submit" className="btn mt-3" style={{ background: '#E7DBEF', color: 'black' }}>
          {t('addAmenity.button')}
        </button>
      </form>
    </div>
  );
};

export default AddAmenities;
