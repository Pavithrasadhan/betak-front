// components/UserTransactions.js
import React, { useEffect, useState } from "react";
import API from "../utils/api";

const UserTransactions = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get(`/stripe/user-transactions/${userId}`);
        setTransactions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions", err);
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  if (loading) return <p>Loading transactions...</p>;

  if (transactions.length === 0) return <p className="text-muted text-center">No transactions found.</p>;

  return (
    <div className="table-responsive">
      <h5 className="mb-3">Your Subscription Transactions</h5>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Plan ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.transactionId}</td>
              <td>${tx.amount}</td>
              <td>{tx.status}</td>
              <td>{tx.planId}</td>
              <td>{new Date(tx.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTransactions;
