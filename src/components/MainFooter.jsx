import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MainFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-dark text-white footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <Link to="/about" className="btn text-white">
              {t("footer.about")}
            </Link>
            <span className="mx-2 text-white">|</span>
            <Link to="/contact" className="btn text-white">
              {t("footer.contact")}
            </Link>
            <span className="mx-2 text-white">|</span>
            <Link to="/privacy" className="btn text-white">
              {t("footer.privacy")}
            </Link>
          </div>

          <div className="col-md-6">
            <a className="btn btn-outline-light btn-social" href="#">
              <i className="fab fa-twitter" />
            </a>
            <a className="btn btn-outline-light btn-social" href="#" style={{ marginLeft: '8px' }}>
              <i className="fab fa-facebook-f" />
            </a>
            <a className="btn btn-outline-light btn-social" href="#" style={{ marginLeft: '8px' }}>
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="btn btn-outline-light btn-social" href="#" style={{ marginLeft: '8px' }}>
              <i className="fab fa-youtube" />
            </a>
          </div>

          <div className="col-12 text-white mt-3">
            {t("footer.country")}: UAE
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright text-center py-4">
          <p className="mb-0 text-white">© 2025 Betak.com</p>
        </div>
      </div>

      <a
        href="#"
        className="btn btn-lg btn-lg-square back-to-top"
        style={{ backgroundColor: '#A56ABD', color: 'white' }}
      >
        <i className="fas fa-arrow-up" />
      </a>
    </div>
  );
};

export default MainFooter;
