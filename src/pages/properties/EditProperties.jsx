import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { useTranslation } from 'react-i18next';

const EditProperty = () => {
  const { t } = useTranslation(); 
  const { id } = useParams();
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

  const [existingImages, setExistingImages] = useState([]);
  const [allAmenities, setAllAmenities] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        const [propertyRes, amenitiesRes] = await Promise.all([
          API.get(`/properties/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          API.get('/amenities', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const property = propertyRes.data;

        setFormData({
          name: property.name,
          location: property.location,
          description: property.description,
          rent: property.rent,
          bed: property.bed,
          bath: property.bath,
          sqft: property.sqft,
          amenities: property.amenities.map((a) => a._id),
          furnishing: property.furnishing,
          map: property.map,
        });

        setExistingImages(property.images || []);
        setAllAmenities(amenitiesRes.data);
      } catch (err) {
        console.error(err);
        setError(t('errorFailedLoad')); 
      }
    };

    fetchProperty();
  }, [id, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleAmenityToggle = (amenityId) => {
    const updatedAmenities = formData.amenities.includes(amenityId)
      ? formData.amenities.filter((id) => id !== amenityId)
      : [...formData.amenities, amenityId];
    setFormData((prev) => ({ ...prev, amenities: updatedAmenities }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      existingImages.forEach((img) => {
        data.append('existingImages', img);
      });

      newImages.forEach((img) => {
        data.append('images', img);
      });

      await API.put(`/properties/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/properties');
    } catch (err) {
      setError(t('errorFailedUpdate')); 
      console.error(err);
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{t('updateProperty')}</h2> 
      </div>

      {error && <p className="text-danger">{error}</p>} 

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-3 mb-3">
            <label>{t('name')}</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t('location')}</label> 
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t('rent')}</label> 
            <input type="text" name="rent" value={formData.rent} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t('bed')}</label> 
            <input type="text" name="bed" value={formData.bed} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 mb-3">
            <label>{t('bath')}</label> 
            <input type="text" name="bath" value={formData.bath} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t('sqft')}</label> 
            <input type="text" name="sqft" value={formData.sqft} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t('furnishing')}</label> 
            <input type="text" name="furnishing" value={formData.furnishing} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3 mb-3">
            <label>{t('map')}</label>
            <input type="text" name="map" value={formData.map} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 mb-3">
            <label>{t('amenities')}</label> 
            <div className="border rounded p-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {allAmenities.map((amenity) => (
                <div key={amenity._id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`amenity-${amenity._id}`}
                    checked={formData.amenities.includes(amenity._id)}
                    onChange={() => handleAmenityToggle(amenity._id)}
                  />
                  <label className="form-check-label" htmlFor={`amenity-${amenity._id}`}>
                    <i className={`fa ${amenity.icon} me-1`} /> {amenity.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <label>{t('description')}</label> 
            <textarea name="description" className="form-control" rows="5" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="col-md-3 mb-3">
            <label>{t('existingImages')}</label> 
            <div className="d-flex flex-wrap">
              {existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:3001/${img.replace(/\\/g, '/')}`}
                  alt="property"
                  width="80"
                  height="60"
                  className="me-2 mb-2"
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
              ))}
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <label>{t('uploadNewImages')}</label>
            <input
              type="file"
              name="images"
              multiple
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <div className="col-md-3 mb-3 d-flex align-items-end">
            <button type="submit" className="btn" style={{ background: '#E7DBEF', fontWeight: 'bold', color: 'black'}}>{t('updateProperty')}</button> 
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
