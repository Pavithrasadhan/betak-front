import React from "react";
import { useTranslation } from "react-i18next";
import MainFooter from "../components/MainFooter";
import Navbar from "../components/Navbar";
import MainProperty from "../pages/MainProperty";
import Search from "../components/Search";

const HeroPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      
      <div className="header container" style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            height: '70vh',
            width: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          
          <div
            style={{
              backgroundImage: `url("/bg.jpg")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(0.7px)',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 2,
            }}
          />

          <div
            className="position-absolute top-50 start-50 translate-middle text-center w-100 px-3"
            style={{ zIndex: 3 }}
          >
            <div
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                fontWeight: 'bold',
              }}
            >
              {t('explore_title')}
            </div>
            <div
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                color: 'white',
                marginTop: '10px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
            >
              {t('affordable_title')}
            </div>


            <div
              className="mt-4 shadow-lg mx-auto"
              style={{
                maxWidth: '900px',
                width: '100%',
              }}
            >
              <Search />
            </div>
          </div>
        </div>
      </div>

      {/* Property Section */}
      <div className="container mt-5">
        <MainProperty />
      </div>

      <MainFooter />
    </div>
  );
};

export default HeroPage; 