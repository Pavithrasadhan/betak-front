import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../utils/api';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.get('/stripe/transactions');
        setTransactions(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);


  if (loading) {
    return <div className="container my-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container my-5 text-danger text-center">{error}</div>;
  }

  return (
    <div className="container content-wrapper my-5">
      <h3 className="mb-4">Transaction History</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-primary">
            <tr>
              <th>Session ID</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{(transaction.amount_total / 100).toFixed(2)}</td>
                <td>{transaction.currency.toUpperCase()}</td>
                <td>{transaction.payment_status}</td>
                <td>{transaction.payment_method_types.join(', ')}</td>
                <td>
          
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactions;
