import React, { useEffect, useContext, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './index.css';

const Verify = () => {
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    // Function to verify payment
    const verifyPayment = useCallback(async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`,
                { success, orderId }
            );
            if (response.data.success) {
                // Navigate to orders page on success
                toast.success('Order placed Successfully.');
                navigate('/myorders');
            } else {
                // Navigate to home page on failure
                toast.error('Order failed. Please try again.');
                navigate('/');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            // Navigate to error page on exception
            navigate('/');
        }
    }, [url, success, orderId, navigate]);

    // Trigger payment verification on component mount
    useEffect(() => {
        verifyPayment();
    }, [verifyPayment]);

    return (
        <div className='verify'>
            <div className='spinner'>
                {/* Spinner for loading indication */}
            </div>
            <p>Processing your payment...</p>
        </div>
    );
}

export default Verify;
