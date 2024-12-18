import React from 'react';
import cancel from '../images/cancel-removebg-preview.png';
import { useNavigate } from 'react-router-dom';


const PaymentCancelled = () => {

const navigate = useNavigate();

  return (
    <div className='correct-payment'>
      <div>
        <img src={cancel} />
        <h1>Payment cancelled</h1>
        <button className='view-order-payment' onClick={() => navigate('/products')}>CONTINUE SHOPPING</button>
      </div>
    </div>
  )
}

export default PaymentCancelled