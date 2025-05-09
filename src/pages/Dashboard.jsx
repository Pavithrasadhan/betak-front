import React, { useEffect, useState } from "react";
import API from '../utils/api';
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/user/all-users');
        const userData = Array.isArray(res.data) ? res.data : res.data.users || [];
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch users');
        console.error("API Error:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await API.get('/properties');
        const propertyData = Array.isArray(res.data) ? res.data : res.data.properties || [];
        setProperties(propertyData);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="content-wrapper container">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="m-0" style={{ fontWeight: 'bold', color: '#A56ABD' }}>{t("dashboard")}</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{t("allUsers")}</h3>
                  <p>{loading ? t("loading") : user.length}</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user" />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{t("allProperties")}</h3>
                  <p>{loading ? t("loading") : properties.length}</p>
                </div>
                <div className="icon">
                  <i className="fas fa-home" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
