import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const UserRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRentalId, setSelectedRentalId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formFiles, setFormFiles] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const rentalRes = await API.get('/rental/my-rentals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRentals(Array.isArray(rentalRes.data) ? rentalRes.data : []);
      } catch (err) {
        console.error('Error fetching rentals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e, rentalId, type) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }

    setFormFiles((prev) => ({
      ...prev,
      [rentalId]: {
        ...prev[rentalId],
        [type]: file,
      },
    }));
  };

  const handleSubmit = async (rentalId) => {
    const files = formFiles[rentalId];
    if (!files?.beforePictures || !files?.afterPictures) {
      setError('Please upload both before and after pictures.');
      return;
    }

    setUploading(true);
    setError(''); 

    const formData = new FormData();
    formData.append('beforePictures', files.beforePictures);
    formData.append('afterPictures', files.afterPictures);

    try {
      const token = localStorage.getItem('token');
      await API.put(`/rental/${rentalId}/complete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

  
      const updatedRentals = await API.get('/rental/my-rentals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRentals(updatedRentals.data);
      setSelectedRentalId(null); 
      setFormFiles((prev) => {
        const updatedFiles = { ...prev };
        delete updatedFiles[rentalId];
        return updatedFiles;
      });
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to submit condition report. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading Rentals...</div>;

  return (
    <div>
      <h3 className="mb-3">Your Rentals</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {rentals.length > 0 ? (
        <ul className="list-group">
          {rentals.map((rental) => {
            const hasAfterPicture = rental.afterPictures && rental.afterPictures.length > 0; 
            const isApproved = rental.status === 'approved';
            const isCompleted = rental.status === 'completed';

            return (
              <li key={rental._id} className="list-group-item">
                <strong>Property:</strong> {rental.property?.name || 'N/A'} <br />
                <strong>Status:</strong> {rental.status} <br />
                <strong>Start Date:</strong> {new Date(rental.startDate).toLocaleDateString()} <br />
                <strong>End Date:</strong> {new Date(rental.endDate).toLocaleDateString()} <br />

                {isApproved && !hasAfterPicture && (
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={() => setSelectedRentalId(rental._id)}
                  >
                    Submit Condition Report
                  </button>
                )}

                {selectedRentalId === rental._id && !hasAfterPicture && (
                  <div className="mt-3">
                    <div className="form-group mb-2">
                      <label>Before Picture:</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, rental._id, 'beforePictures')}
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label>After Picture:</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, rental._id, 'afterPictures')}
                      />
                    </div>

                    <button
                      className="btn btn-success"
                      disabled={uploading}
                      onClick={() => handleSubmit(rental._id)}
                    >
                      {uploading ? 'Submitting...' : 'Submit Report'}
                    </button>
                  </div>
                )}

                {hasAfterPicture && (
                  <div className="mt-2 text-success">✅ Condition report submitted</div>
                )}

                {isCompleted && !hasAfterPicture && (
                  <div className="mt-2 text-muted">Rental marked as completed.</div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No rentals found.</p>
      )}
    </div>
  );
};

export default UserRentals;
