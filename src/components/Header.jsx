import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import API from '../utils/api';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [i18n.language]);

  const handleLogout = async () => {
    try {
      
      await API.post('/auth/logout');

      localStorage.removeItem('token');
      localStorage.removeItem('username');

      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="fixed-top" style={{ background: '#E7DBEF' }}>
      <nav className="main-header navbar navbar-expand navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">{t("home")}</Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <button className="btn btn-sm btn-light mx-1" onClick={() => i18n.changeLanguage('en')}>EN</button>
            <button className="btn btn-sm btn-light mx-1" onClick={() => i18n.changeLanguage('ar')}>AR</button>
          </li>

          {username && (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <button className="dropdown-item" onClick={handleLogout}>
                  {t('logout')}
                </button>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
