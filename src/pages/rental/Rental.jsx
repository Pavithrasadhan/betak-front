import React, { useState, useEffect } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const RentalManagement = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const { data } = await API.get("/rental");
        console.log("Fetched rentals:", data); 
        setRentals(data);
        setLoading(false);
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message;
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/rental/${id}/status`, { status });
      setRentals(rentals.map(r => (r._id === id ? { ...r, status } : r)));
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this rental?")) {
      try {
        await API.delete(`/rental/${id}`);
        setRentals(rentals.filter(r => r._id !== id));
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message;
        setError(errorMessage);
      }
    }
  };

  const handleViewInspectionRequest = (rentalId) => {
    navigate(`/adminrentals/${rentalId}`);
  };

  if (loading) return <div className="text-center my-5">Loading rentals...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container content-wrapper mt-4">
      <h2 className="mb-4">Rental Management</h2>

      {rentals.length === 0 && <div className="alert alert-info">No rentals available.</div>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Property</th>
            <th>User</th>
            <th>Dates</th>
            <th>Status</th>
            <th>View Inspection Request</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => {
            const hasInspectionData =
              (rental.beforePictures && rental.beforePictures.length > 0) ||
              (rental.afterPictures && rental.afterPictures.length > 0);

            return (
              <tr key={rental._id}>
                <td>{rental.property?.name || "N/A"}</td>
                <td>{rental.user?.name || "N/A"}</td>
                <td>
                  {new Date(rental.startDate).toLocaleDateString()} -{" "}
                  {new Date(rental.endDate).toLocaleDateString()}
                </td>
                <td>
                  <Badge
                    bg={
                      rental.status === "approved"
                        ? "success"
                        : rental.status === "rejected"
                        ? "danger"
                        : "warning"
                    }
                    className="text-capitalize"
                  >
                    {rental.status}
                  </Badge>
                </td>
                <td>
                  {hasInspectionData ? (
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleViewInspectionRequest(rental._id)}
                    >
                      View Request
                    </Button>
                  ) : (
                    "No Request"
                  )}
                </td>
                <td>
                  {rental.status === "pending" && (
                    <div className="d-flex gap-2 mb-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleStatusChange(rental._id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusChange(rental._id, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(rental._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default RentalManagement;
