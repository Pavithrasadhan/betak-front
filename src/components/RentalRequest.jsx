import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import API from "../utils/api";

const RentalRequest = ({ property }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userToken = localStorage.getItem("token");

  if (!userToken) {
    navigate("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      return setMessage(t("select_valid_dates"));
    }

    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (days < 3 || days > 7) {
      return setMessage(t("rental_duration_must_be_between_3_and_7_days"));
    }

    const requestData = {
      propertyName: property?.name, 
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      setLoading(true);

      const response = await API.post("/rental", requestData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setMessage(t("rental_request_sent_successfully"));
      setTimeout(() => navigate("/propertylist"), 2000);
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error("Rental request failed:", error);

      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error || t("rental_request_failed")
          : t("rental_request_failed");
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h4>{t("rent_this_property")}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">{t("start_date")}</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t("end_date")}</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate || new Date()}
            className="form-control"
            required
          />
        </div>

        {message && (
          <div
            className={`alert ${
              message.includes("success") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading || message === t("rental_request_sent_successfully")}>
          {loading ? t("sending_request") : t("submit_request")}
        </button>
      </form>
    </div>
  );
};

export default RentalRequest;
