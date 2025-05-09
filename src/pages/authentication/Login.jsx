import React, { useState } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const Login = ({ onClose, onSwitch, onLoginSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token } = response.data;
  
      if (token) {
        const decoded = jwtDecode(token);
        const username = decoded.name || decoded.username || decoded.email;
  
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
  
        setErrorMessage(t('login_success'));
        onClose();
  
        if (onLoginSuccess) {
          onLoginSuccess(username, decoded.role);
        }
  
        if (decoded.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setErrorMessage(t('error_message'));
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || t('error_message');
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
      

        <div className="mb-3">
          <label htmlFor="email" className="form-label">{t('email')}</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email_placeholder')}
            required
            style={{
              border: '1px solid #A56ABD',
              fontWeight: 'bold',
              color: '#A56ABD',
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">{t('password')}</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password_placeholder')}
            required
            style={{
              border: '1px solid #A56ABD',
              fontWeight: 'bold',
              color: '#A56ABD',
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100"
          style={{
            border: '1px solid #A56ABD',
            fontWeight: 'bold',
            color: '#A56ABD',
            backgroundColor: 'transparent'
          }}
          disabled={isLoading}
        >
          {isLoading ? t('loading_button') : t('login_button')}
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem', color: '#A56ABD', fontWeight: 'bold' }}>
          {t('new_to_betak')}
          <span
            onClick={onSwitch}
            style={{
              color: '#A56ABD',
              fontWeight: 'bold',
              textDecoration: 'none',
              marginLeft: '4px',
              cursor: 'pointer'
            }}
          >
            {t('create_account')}
          </span>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      </form>
    </div>
  );
}

export default Login;
