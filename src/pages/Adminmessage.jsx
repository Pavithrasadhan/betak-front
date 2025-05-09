import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../utils/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await API.get('contact');
      setMessages(res.data);
    } catch (err) {
      alert('Failed to load messages.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await API.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container content-wrapper my-5">
      <h2 className="mb-4">User Contact Messages</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped shadow">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No messages found.</td>
              </tr>
            ) : (
              messages.map((msg, index) => (
                <tr key={msg._id}>
                  <td>{index + 1}</td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(msg._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessages;
