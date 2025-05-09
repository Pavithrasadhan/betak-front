import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MainFooter from '../components/MainFooter';
import API from '../utils/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/contact', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card p-5 shadow rounded-4">
              <h2 className="text-center text-primary mb-4">Contact Us</h2>
              <div className="row">
                {/* Form */}
                <div className="col-md-7">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-success rounded-pill">Send Message</button>
                    </div>
                  </form>
                </div>

                {/* Info */}
                <div className="col-md-5 mt-4 mt-md-0">
                  <div className="bg-light rounded p-4 h-100">
                    <h5>Contact Information</h5>
                    <p><strong>Email:</strong> support@betak.com</p>
                    <p><strong>Phone:</strong> +971-123-4567</p>
                    <p><strong>Address:</strong> BETAK Rentals, Dubai, UAE</p>
                    <p><strong>Working Hours:</strong> 9:00 AM – 6:00 PM (Mon – Sat)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default ContactUs;
