import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div>
      <button 
        onClick={() => changeLanguage('en')} 
        className={currentLanguage === 'en' ? 'active' : ''} 
        aria-label="Switch to English">
        English
      </button>
      <button 
        onClick={() => changeLanguage('ar')} 
        className={currentLanguage === 'ar' ? 'active' : ''} 
        aria-label="Switch to Arabic">
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;
