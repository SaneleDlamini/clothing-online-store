import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import Layout from '../UI/Layout';
import Card from '../UI/Card'
import PRODUCTS from '../../config/products';
import image1 from '../../images/hoody1.png';
import { clearCartItems, removeFromCart, incrementQuantity, decrementQuantity } from '../../store/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';


const Cart = () => {

  const dispatch = useDispatch();
  const { totalQuantity, cartItems } = useSelector(state => state.cart);

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);


  const RemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const addQuantity = (id) => {
    dispatch(incrementQuantity(id))
  }

  const removeQuantity = (id) => {
    dispatch(decrementQuantity(id))
  }

  const [order, setOrder] = useState([cartItems])

  const stripePromise = loadStripe('pk_test_51QSfjYELIiRJQmYHLNz115HhYLkdJtgLzSM9V2EV28uzHcghs9PEEEWqYEFQg0G0YtbD6dqaDJkGfpM1z6A1gRIW00Z2SqTvEZ'); // Replace with your Stripe publishable key


  // const handleCheckout = async () => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await fetch('http://localhost:3001/api/orders', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ cartItems }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     navigate('/orders')
  //   } catch (error) {
  //     console.error("Error sending data: ", error);
  //   }
  // }


  const handleCheckoutAi = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }), // Send cart items to backend
      });

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url; // Redirect to Stripe Checkout
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };


  return (
    <div className='cart-layout'>
      <Layout>
        <Card className='card-cart'>
          {cartItems.length > 0 ? <div className='cart-main'>
            <div className='cart-content'>
              <div className='cart-upper-part'>
                <h4 className='cart-title'>SHOPPING CART</h4>
                <h4 className='cart-items-number'>{totalQuantity} ITEMS</h4>
              </div>
              <div className='cart-details'>
                <table>
                  <tr>
                    <th>Item imge</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                  {cartItems.map(product => (
                    <tr>
                      <td><img src={`http://localhost:3001/images/${product.image}`} className='cart-image' /></td>
                      <td>{product.title}</td>
                      <td>
                        <div className='cart-actions'>
                          <button className='cart-remove-action'><h4><FontAwesomeIcon icon={faMinus} onClick={() => removeQuantity(product.id)} /></h4></button>
                          <div>{product.quantity}</div>
                          <button className='cart-remove-action'><h4><FontAwesomeIcon icon={faPlus} onClick={() => addQuantity(product.id)} /></h4></button>
                        </div>
                      </td>
                      <td><h4>R {product.onSale ? product.salePrice : product.price}</h4></td>
                      <td><h4><FontAwesomeIcon icon={faTimes} onClick={() => RemoveItem(product.id)} /></h4></td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            <div className='cart-summery'>
              <h2 className='cart-summery-title'>Summery</h2><hr />
              <div className='cart-summery-deatils'>
                <h5>ITEMS X {totalQuantity}</h5>
                <h5>R {cartItems.reduce((acc, item) => acc + item.quantity * (item.onSale ? item.salePrice : item.price), 0).toFixed(2)}</h5>
              </div>
              <h4 className='coupon-title'>COUPON CODE</h4>
              <input type='text' className='coupon-input' placeholder='coupon code' />
              <div className='cart-summery-deatils'>
                <h5>TOTAL PRICE</h5>
                <h5>R {cartItems.reduce((acc, item) => acc + item.quantity * (item.onSale ? item.salePrice : item.price), 0).toFixed(2)}</h5>
              </div>
              <button className='checkout-button' onClick={() => {
                if (isAuthenticated) {
                  handleCheckoutAi();
                } else {
                  navigate('/login');
                }
              }}>CHECKOUT</button>
            </div>
          </div> : <h2>YOUR CART IS EMPTY</h2>}
        </Card>
      </Layout>
    </div>
  )
}

export default Cart