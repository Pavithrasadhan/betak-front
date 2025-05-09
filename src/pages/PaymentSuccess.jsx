import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const PaymentSuccess = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [email, setEmail] = useState(null);
  const [amount, setAmount] = useState(null);

  const { search } = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(search).get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await API.get(`/stripe/verify-subscription?session_id=${sessionId}`);
        if (response.data.success) {
          setIsVerified(true);
          setReceiptUrl(response.data.receiptUrl);
          setTransactionId(response.data.transactionId);
          setEmail(response.data.email);
          setAmount(response.data.amountTotal);
        }
      } catch (error) {
        navigate('/payment-failed');
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId, navigate]);

  if (!isVerified) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Verifying payment...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <h3 className="card-title mb-3 text-success">Rental Confirmed! 🏠</h3>
              <p className="text-muted">Your property subscription is now active.</p>

              <div className="text-start mt-4">
                {transactionId && (
                  <p><strong>Transaction ID:</strong> {transactionId}</p>
                )}
                {email && (
                  <p><strong>Email:</strong> {email}</p>
                )}
                {amount !== null && (
                  <p><strong>Amount Paid:</strong> ${amount.toFixed(2)}</p>
                )}
                {receiptUrl && (
                  <p>
                    <strong>Receipt:</strong>{' '}
                    <a href={receiptUrl} target="_blank" rel="noopener noreferrer">
                      View Receipt
                    </a>
                  </p>
                )}
              </div>

              <button
                className="btn btn-success mt-4"
                onClick={() => navigate('/userdashboard')}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
