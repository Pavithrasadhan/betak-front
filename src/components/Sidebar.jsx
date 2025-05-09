import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div>
      <aside className="main-sidebar sidebar-primary elevation-4" style={{ background: '#E7DBEF' }}>
        {/* Brand Logo */}
        <a href="/" className="brand-link">
          <span className="navbar-brand fw-bold fs-4" style={{ color: "#A56ABD" }}>
            بيتك (BETAK)
          </span>
        </a>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>{t("sidebar.dashboard")}</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  <i className="nav-icon fas fa-user" />
                  <p>{t("sidebar.user")}</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/properties" className="nav-link">
                  <i className="nav-icon fas fa-home" />
                  <p>{t("sidebar.properties")}</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/amenities" className="nav-link">
                  <i className="nav-icon fas fa-cogs" />
                  <p>{t("sidebar.amenities")}</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/transaction" className="nav-link">
                  <i className="nav-icon fas fa-file-invoice" />
                  <p>{t("sidebar.transaction")}</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rental" className="nav-link">
                  <i className="nav-icon fas fa-clipboard-list" />
                  <p>{t("sidebar.rentalRule")}</p>
                </Link>
              </li>
            
              <li className="nav-item">
                <Link to="/message" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>{t("message")}</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
