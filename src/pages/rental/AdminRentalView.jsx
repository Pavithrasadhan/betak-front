import React, { useState, useEffect } from 'react';
import API from '../../utils/api';

const AdminRentals = () => {
  const [rentals, setRentals] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchRentals = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      try {
        const rentalRes = await API.get('/rental', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRentals(rentalRes.data);
      } catch (err) {
        console.error('Error fetching rentals:', err);
        setError('Failed to fetch rentals.'); 
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);  

  if (loading) {
    return <div>Loading rentals...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='content-wrapper container'>
      <h3>All Rentals</h3>

      {rentals.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Property</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Before Pictures</th>
              <th>After Pictures</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => {
              // Ensure before and after pictures are arrays
              const beforePictures = Array.isArray(rental.beforePictures) ? rental.beforePictures : [];
              const afterPictures = Array.isArray(rental.afterPictures) ? rental.afterPictures : [];

              return (
                <tr key={rental._id}>
                  <td>{rental.property?.name || 'N/A'}</td>
                  <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                  <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                  <td>{rental.status}</td>
                  <td>
                    {beforePictures.length > 0 ? (
                      beforePictures.map((file, index) => (
                        <img
                          key={index}
                          src={file}
                          alt="Before"
                          width="100"
                          height="100"
                        />
                      ))
                    ) : (
                      'No before pictures'
                    )}
                  </td>
                  <td>
                    {afterPictures.length > 0 ? (
                      afterPictures.map((file, index) => (
                        <img
                          key={index}
                          src={file}
                          alt="After"
                          width="100"
                          height="100"
                        />
                      ))
                    ) : (
                      'No after pictures'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No rentals found.</p>
      )}
    </div>
  );
};

export default AdminRentals;
