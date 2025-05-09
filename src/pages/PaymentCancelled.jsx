import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next'; 

const PaymentCancelled = () => {
  const { t } = useTranslation(); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <XCircle size={72} color="red" className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          {t('payment_failed_title') || 'Payment Failed'}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('payment_failed_message') || 'Your payment was not completed. Please try again or contact support if needed.'}
        </p>
        <Link to="/membership" className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition">
          {t('try_again') || 'Try Again'}
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
