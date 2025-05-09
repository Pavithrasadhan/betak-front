import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <footer className="main-footer fixed-bottom" style={{ background: '#E7DBEF' }}>
        <strong>© 2025 Betak.com</strong> {t("footer.rights")}
      </footer>
    </div>
  );
};

export default Footer;
