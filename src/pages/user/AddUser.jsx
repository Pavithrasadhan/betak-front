import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../../utils/api';

const AddUser = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
  });

  const [passportFirstPage, setPassportFirstPage] = useState(null);
  const [passportSecondPage, setPassportSecondPage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('role', formData.role);
      data.append('passportFirstPage', passportFirstPage);
      data.append('passportSecondPage', passportSecondPage);

      const res = await API.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage(t('addUser.success'));
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'tenant',
      });
      setPassportFirstPage(null);
      setPassportSecondPage(null);
    } catch (err) {
      setMessage(`${t('addUser.error')}: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="container content-wrapper mt-4">
      <h2 className="mb-4">{t('addUser.title')}</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='row'>
          <div className='col-md-6'>
            <div className="form-group mb-3">
              <label>{t('addUser.name')}</label>
              <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group mb-3">
              <label>{t('addUser.email')}</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group mb-3">
              <label>{t('addUser.password')}</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="form-group mb-3">
              <label>{t('addUser.role')}</label>
              <select className="form-control" name="role" value={formData.role} onChange={handleChange}>
                <option value="tenant">{t('addUser.tenant')}</option>
                <option value="admin">{t('addUser.admin')}</option>
              </select>
            </div>
          </div>

          <div className='col-md-6'>
          

            <div className="form-group mb-3">
              <label>{t('addUser.passportFirstPage')}</label>
              <input type="file" className="form-control" onChange={(e) => setPassportFirstPage(e.target.files[0])} accept="image/*" required />
            </div>

            <div className="form-group mb-3">
              <label>{t('addUser.passportSecondPage')}</label>
              <input type="file" className="form-control" onChange={(e) => setPassportSecondPage(e.target.files[0])} accept="image/*" required />
            </div>
          </div>
        </div>

        <button type="submit" className="btn mt-3" style={{ background: '#E7DBEF', fontWeight: 'bold', color: 'black'}}>
          {t('addUser.submit')}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
