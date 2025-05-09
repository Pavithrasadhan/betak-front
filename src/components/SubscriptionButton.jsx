import { useState } from 'react';
import API from '../utils/api';
import Navbar from './Navbar';
import MainFooter from './MainFooter';

const StripeSubscribeButton = ({ userId, userEmail }) => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }

    try {
      const res = await API.post('/stripe/create-checkout-session', {
        priceId: selectedPlan,
        userId,
        userEmail,
      });
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div style={{width: '99vw'}}>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <div className="card shadow-lg border-0 rounded-4 p-5">
              <h3 className="card-title text-center" style={{color: '#A56ABD', fontWeight: 'bold'}}>Choose Your Plan</h3>
              <div className="card-body">

                {/* Basic Plan */}
                <div className="mb-4 d-flex flex-column align-items-center">
                  <div className="form-check p-4 border rounded-4 shadow-sm text-center w-100">
                    <input
                      className="form-check-input mb-2"
                      type="radio"
                      name="plan"
                      id="basicPlan"
                      value="price_1RJSKWCvEvZHwJCsompT8sbx"
                      onChange={(e) => setSelectedPlan(e.target.value)}
                    />
                    <label className="form-check-label fs-5" htmlFor="basicPlan">
                      <strong>Basic Plan</strong>
                    </label>
                    <div className="fs-6 text-muted">Access to basic features</div>
                    <span className="badge bg-light text-dark mt-2">49/month</span>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="mb-4 d-flex flex-column align-items-center">
                  <div className="form-check p-4 border rounded-4 shadow-sm text-center w-100">
                    <input
                      className="form-check-input mb-2"
                      type="radio"
                      name="plan"
                      id="premiumPlan"
                      value="price_1RJSL9CvEvZHwJCs4DVmhCOH"
                      onChange={(e) => setSelectedPlan(e.target.value)}
                    />
                    <label className="form-check-label fs-5" htmlFor="premiumPlan">
                      <strong>Premium Plan</strong>
                    </label>
                    <div className="fs-6 text-muted">Unlock premium features</div>
                    <span className="badge bg-light text-dark mt-2">129/month</span>
                  </div>
                </div>

                {/* Subscribe Button */}
                <div className="d-grid mt-4">
                  <button
                    className="btn rounded-pill fs-5 shadow-lg" style={{backgroundColor: '#A56ABD', color: 'white'}}
                    onClick={handleSubscribe}
                  >
                    Subscribe Now
                  </button>
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

export default StripeSubscribeButton;
