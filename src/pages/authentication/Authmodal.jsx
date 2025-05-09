import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { useTranslation } from "react-i18next";

const AuthModal = ({ isOpen, onClose, initialType = "login", onLoginSuccess }) => {
  const { t } = useTranslation();
  const [type, setType] = useState(initialType);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const switchType = () => {
    setType(type === "login" ? "register" : "login");
  };

  if (!isOpen) return null;

  const marginTop = type === "login" ? "200px" : "100px";

  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ marginTop: marginTop }}>
          <div className="modal-header">
            <h5 className="modal-title" style={{ color: "#A56ABD" }}>
              {t("modalTitle")}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
  

      {type === "login" ? (
        <Login onClose={onClose} onSwitch={switchType} onLoginSuccess={onLoginSuccess} />
      ) : (
        <Register onClose={onClose} onSwitch={switchType} />
      )}
    </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
