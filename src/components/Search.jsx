import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    if (location.trim() !== '') {
      navigate(`/search?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div style={{ marginTop: '40px', marginBottom: '25px' }}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="row g-3 w-100 justify-content-center text-center" style={{ maxWidth: '700px' }}>
            {/* Location Input */}
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control py-2"
                value={location}
                placeholder={t('search_placeholder')}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '1px solid #ccc',
                  borderRadius: '30px',
                  width: '100%',
                }}
              />
            </div>

            {/* Search Button */}
            <div className="col-12 col-md-4">
              <button
                className="btn border-0 w-100 py-2"
                style={{ backgroundColor: '#A56ABD', color: 'white', borderRadius: '30px' }}
                onClick={handleSearch}
              >
                {t('search_button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
