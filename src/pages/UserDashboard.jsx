import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";
import { toast } from "react-toastify";
import UserRentals from "./UserRentals";
import UserSavedProperties from "../components/UserSavedProperties";
import UserTransactions from "../components/UserTransaction";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("rentals");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to view this page.");
        navigate("/");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userRes = await API.get("/user/me", config);
        const user = userRes.data?.user;
        if (!user) throw new Error("User data is missing from response");

        setUserData(user);

        let storedFavorites = [];
        try {
          storedFavorites = JSON.parse(localStorage.getItem("savedProperties")) || [];
        } catch (e) {
          console.warn("Invalid savedProperties in localStorage", e);
        }

        setSavedProperties(storedFavorites.length > 0 ? storedFavorites : user.favorites || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard:", err.response?.data || err.message || err);
        toast.error("There was an issue fetching your data.");
        navigate("/");
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSavedProperty = (id) => {
    const updated = savedProperties.filter((p) => p._id !== id);
    setSavedProperties(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (!userData) {
    return <div className="container mt-5 text-center text-danger">Failed to load user data.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-container d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div className="sidebar bg-dark text-white p-4" style={{ minWidth: "250px", marginTop: "50px" }}>
          <p className="text-white-50">Welcome, {userData.name}</p>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button onClick={() => setActiveSection("rentals")} className="nav-link text-white btn btn-link p-0 text-start">
                Rentals
              </button>
            </li>
            <li className="nav-item mb-2">
              <button onClick={() => setActiveSection("saved")} className="nav-link text-white btn btn-link p-0 text-start">
                Saved Properties
              </button>
            </li>
            <li className="nav-item mb-2">
              <button onClick={() => setActiveSection("subscription")} className="nav-link text-white btn btn-link p-0 text-start">
                Subscription
              </button>
            </li>
            <li className="nav-item mt-4">
              <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content p-4 flex-grow-1">
          {activeSection === "rentals" && (
            <>
              <h3 className="mb-4">Your Rentals</h3>
              <UserRentals />
            </>
          )}

          {activeSection === "saved" && (
            <>
              <h3 className="mb-4">Your Saved Properties</h3>
              <UserSavedProperties savedProperties={savedProperties} onDelete={handleDeleteSavedProperty} />
            </>
          )}

          {activeSection === "subscription" && (
            <>
              <h3 className="mb-4 text-center">Subscription</h3>
              <p className="text-center">Manage your plan and enjoy exclusive rental benefits.</p>
              <div className="text-center mb-3">
                <button className="btn btn-primary" onClick={() => navigate("/subscription")}>
                  Go to Subscription Page
                </button>
              </div>
      
            </>
          )}
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default UserDashboard;
