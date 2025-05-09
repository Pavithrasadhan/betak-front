import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AuthModal from "../pages/authentication/Authmodal";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    console.log("✅ Loaded from storage:", { token, user });

    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, [modalOpen]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const openModal = (type) => {
    setAuthType(type);
    setModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const handleLoginSuccess = (username) => {
    localStorage.setItem("username", username);
    setUsername(username);
    setIsLoggedIn(true);
    setModalOpen(false);
  };

  return (
    <>
      <div className={`nav-bar ${modalOpen ? "blur-sm" : ""}`} style={{ width: "99vw" }}>
        <nav className="navbar container navbar-expand-lg py-0 px-5">
          <span className="navbar-brand fw-bold fs-4" style={{ color: "#A56ABD" }}>
            بيتك (BETAK)
          </span>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <span className="nav-item nav-link fw-bold">
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  {t("home")}
                </Link>
              </span>
              <span className="nav-item nav-link fw-bold">
                <Link to="/propertylist" style={{ textDecoration: "none", color: "black" }}>
                  {t("properties")}
                </Link>
              </span>
            </div>

            <div className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-purple dropdown-toggle fw-bold"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: "#A56ABD",
                      border: "1px solid #A56ABD",
                    }}
                  >
                    Welcome
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/userdashboard">
                        {t("profile")}
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        {t("signout")}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  onClick={() => openModal("login")}
                  style={{
                    padding: "6px 12px",
                    color: "#A56ABD",
                    border: "1px solid #A56ABD",
                    fontWeight: "bold",
                    background: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    margin: 0,
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fa fa-user" style={{ margin: 0 }}></i>
                  {t("Login")}
                </button>
              )}

              {/* 🌍 Language Switcher */}
              <div className="d-flex align-items-center mx-2">
                <button
                  className="btn btn-sm btn-light mx-1"
                  onClick={() => i18n.changeLanguage("en")}
                >
                  EN
                </button>
                <button
                  className="btn btn-sm btn-light mx-1"
                  onClick={() => i18n.changeLanguage("ar")}
                >
                  AR
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={authType}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
