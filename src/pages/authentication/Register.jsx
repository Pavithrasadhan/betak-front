import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../utils/api';

const Register = ({ onClose, onSwitch }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant', // Default role is 'tenant'
  });

  const [passportFirstPage, setPassportFirstPage] = useState(null);
  const [passportSecondPage, setPassportSecondPage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'passportFirstPage') {
      setPassportFirstPage(files[0]);
    } else if (name === 'passportSecondPage') {
      setPassportSecondPage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passportFirstPage || !passportSecondPage) {
      setMessage(t('passport_images_required') || 'Both passport images are required.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role); // Send the selected role
    data.append('passportFirstPage', passportFirstPage);
    data.append('passportSecondPage', passportSecondPage);

    try {
      const res = await API.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(t('message_registration_successful') || 'Registration successful');
      onSwitch('login');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMsg = err?.response?.data?.message || t('message_registration_failed') || 'Registration failed';
      setMessage(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('name_placeholder')}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('email_placeholder')}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={t('password_placeholder')}
          className="form-control"
          required
        />
      </div>

      {/* Role Selection */}
      <div className="mb-3">
        <label>{t('select_role')}</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="tenant">{t('tenant')}</option>
          <option value="admin">{t('admin')}</option>
        </select>
      </div>

      <div className="mb-3">
        <label>{t('passport_first_page')}</label>
        <input
          type="file"
          name="passportFirstPage"
          onChange={handleFileChange}
          className="form-control"
          accept="image/*"
          required
        />
      </div>

      <div className="mb-3">
        <label>{t('passport_second_page')}</label>
        <input
          type="file"
          name="passportSecondPage"
          onChange={handleFileChange}
          className="form-control"
          accept="image/*"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {t('register_button')}
      </button>

      {message && (
        <p className="mt-3 text-danger text-center">{message}</p>
      )}

      <div className="text-center mt-3">
        {t('already_have_account')}{" "}
        <span
          onClick={() => onSwitch('login')}
          style={{ color: '#A56ABD', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {t('login_link')}
        </span>
      </div>
    </form>
  );
};

export default Register;
