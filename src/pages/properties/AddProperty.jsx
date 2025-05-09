import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { useTranslation } from 'react-i18next';

const AddProperty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    rent: '',
    bed: '',
    bath: '',
    sqft: '',
    amenities: [],
    furnishing: '',
    map: '',
  });

  const [images, setImages] = useState([]);
  const [allAmenities, setAllAmenities] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [amenitiesRes] = await Promise.all([
          API.get('/amenities', {
            headers: { Authorization: `Bearer ${token}` },
          }),

        ]);

        setAllAmenities(amenitiesRes.data);

      } catch (err) {
        console.error('Failed to load data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleAmenityToggle = (amenityId) => {
    const updatedAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter((id) => id !== amenityId)
      : [...formData.amenities, amenityId];
    setFormData((prev) => ({ ...prev, amenities: updatedAmenities }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'amenities') {
          value.forEach((id) => data.append('amenities', id));
        } else {
          data.append(key, value);
        }
      });

      images.forEach((file) => {
        data.append('images', file);
      });

      await API.post('/properties', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMsg(t("property.addSuccess"));
      setTimeout(() => navigate('/properties'), 1500);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || t("property.addError"));
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <h2>{t("property.addNew")}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          {/* Basic Details */}
          <div className="col-md-3 mb-3">
            <label>{t("property.name")}</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t("property.location")}</label>
            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t("property.rent")}</label>
            <input type="text" name="rent" className="form-control" value={formData.rent} onChange={handleChange} required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t("property.sqft")}</label>
            <input type="text" name="sqft" className="form-control" value={formData.sqft} onChange={handleChange} required />
          </div>

          <div className="col-md-3 mb-3">
            <label>{t("property.bed")}</label>
            <input type="text" name="bed" className="form-control" value={formData.bed} onChange={handleChange} required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t("property.bath")}</label>
            <input type="text" name="bath" className="form-control" value={formData.bath} onChange={handleChange} required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t("property.furnishing")}</label>
            <input type="text" name="furnishing" className="form-control" value={formData.furnishing} onChange={handleChange} required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t("property.map")}</label>
            <input type="url" name="map" className="form-control" value={formData.map} onChange={handleChange} required />
          </div>

          {/* Amenities Section */}
          <div className="col-md-6 mb-3">
            <label>{t("property.amenities")}</label>
            <div className="border rounded p-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {allAmenities.length > 0 ? (
                allAmenities.map((amenity) => (
                  <div key={amenity._id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={amenity._id}
                      id={`amenity-${amenity._id}`}
                      onChange={() => handleAmenityToggle(amenity._id)}
                      checked={formData.amenities.includes(amenity._id)}
                    />
                    <label className="form-check-label" htmlFor={`amenity-${amenity._id}`}>
                      <i className={`fa ${amenity.icon} me-1`} /> {amenity.name}
                    </label>
                  </div>
                ))
              ) : (
                <p>{t("property.loadingAmenities")}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="col-md-6 mb-3">
            <label>{t("property.description")}</label>
            <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} required />
          </div>

          {/* Image Upload */}
          <div className="col-md-12 mb-3">
            <label>{t("property.uploadImages")}</label>
            <input type="file" name="images" multiple className="form-control" onChange={handleImageChange} required />
          </div>
        </div>

        <button type="submit" className="btn mt-2" style={{ background: '#E7DBEF', fontWeight: 'bold', color: 'black' }}>
          {t("property.submit")}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
