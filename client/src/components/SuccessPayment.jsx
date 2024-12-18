import React, { useEffect } from 'react';
import Card from './UI/Card';
import correct from '../images/correct2-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SuccessPayment = () => {

  const {  cartItems } = useSelector(state => state.cart);

  const navigate =  useNavigate()

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems }),
      });
      console.log(cartItems);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  }

  useEffect(() => {
    handleCheckout();
  }, []);

  return (
    <div className='correct-payment'>
      <div>
        <img src={correct} />
        <h1>Payment successfully completed</h1>
        <button className='view-order-payment' onClick={() => navigate('/orders')}>VIEW YOUR ORDER</button>
      </div>
    </div>
  )
}

export default SuccessPayment