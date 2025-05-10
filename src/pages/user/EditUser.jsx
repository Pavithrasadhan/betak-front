import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../utils/api';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
    passportFirstPage: null,
    passportSecondPage: null,
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get(`/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {
          name,
          email,
          role,
          passportFirstPage,
          passportSecondPage,
        } = response.data;

        setFormData((prev) => ({
          ...prev,
          name,
          email,
          role,
          passportFirstPage,
          passportSecondPage,
        }));
      } catch (err) {
        console.error(err);
        setMessage(t('error_fetching_user_data') + ': ' + err.message);
      }
    };

    fetchUserDetails();
  }, [id, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (formData.password) {
      data.append('password', formData.password);
    }
    data.append('role', formData.role);

    if (formData.passportFirstPage && typeof formData.passportFirstPage !== 'string') {
      data.append('passportFirstPage', formData.passportFirstPage);
    }
    if (formData.passportSecondPage && typeof formData.passportSecondPage !== 'string') {
      data.append('passportSecondPage', formData.passportSecondPage);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage(t('error_message') + ': ' + t('no_token_found'));
        return;
      }

      await API.put(`/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(t('success_message'));
    } catch (err) {
      console.error(err);
      setMessage(
        t('error_message') + ': ' + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <h2>{t('edit_user')}</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">{t('name')}</label>
              <input
                id="name"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">{t('role')}</label>
              <select
                id="role"
                className="form-control"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="tenant">{t('tenant')}</option>
                <option value="admin">{t('admin')}</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="passportFirstPage">{t('passport_first_page')}</label>
              <input
                id="passportFirstPage"
                type="file"
                className="form-control"
                name="passportFirstPage"
                onChange={handleFileChange}
                accept="image/*"
                aria-label={t('passport_first_page')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passportSecondPage">{t('passport_second_page')}</label>
              <input
                id="passportSecondPage"
                type="file"
                className="form-control"
                name="passportSecondPage"
                onChange={handleFileChange}
                accept="image/*"
                aria-label={t('passport_second_page')}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          style={{
            background: '#E7DBEF',
            fontWeight: 'bold',
            color: 'black',
          }}
          disabled={loading}
        >
          {loading ? t('updating') + '...' : t('update_user')}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
