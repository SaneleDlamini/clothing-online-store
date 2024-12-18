import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../UI/LoadingSpinner";
import Layout from '../UI/Layout';
import Card from '../UI/Card'
import PRODUCTS from '../../config/products';
import { useSelector, useDispatch } from 'react-redux';

const OrderTabs = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  const [activeTab, setActiveTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [progress, setProgress] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [completed, setCompleted] = useState([]);

  const navigate = useNavigate();
  const {isAuthenticated, user} = useSelector((state) => state.auth);

  const [ condition, setCondition ] = useState(user.isAdmin);
  
  const handleUpdate = (id) => {
    navigate(`/update-order/${id}`)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
     setCondition(user.isAdmin);
     console.log("Testing here"+condition);
     const token = localStorage.getItem('token');
      try {
        if(condition === true){
          const response = await fetch(`http://localhost:3001/api/orders?tab=${activeTab}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setOrders(result.orders);
        }else if(!condition){
          const response = await fetch(`http://localhost:3001/api/orders/my-orders?tab=${activeTab}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setOrders(result.orders);
        }
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab, condition]);

  return (
    <div className="order-container">
      <div>
        <h4 className="orders-title">LIST OF ORDERS</h4>
        <div className="tabs">
          <button
            onClick={() => setActiveTab("pending")}
            className={activeTab === "pending" ? "actives" : ""}
          >
            Pending Orders
          </button>
          <button
            onClick={() => setActiveTab("in-progress")}
            className={activeTab === "in-progress" ? "actives" : ""}
          >
            In-Progress Orders
          </button>
          <button
            onClick={() => setActiveTab("delivered")}
            className={activeTab === "delivered" ? "actives" : ""}
          >
            Delivered Orders
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={activeTab === "completed" ? "actives" : ""}
          >
            Past Orders
          </button>
        </div>

        <div className="content">
        {orders.length > 0 && orders.some(item => item.status === activeTab)?
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Title</th>
                <th>Item Image</th>
                <th>Price</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Ordered At</th>
                <th>Delivered</th>
                <th>Address</th>
                <th>Status</th>
                {user.isAdmin && <th>Action</th>}
              </tr>
            </thead>
            {loading ? <LoadingSpinner /> :
            <tbody>
              {orders.map((order, index) => (
                order.items.map((item) => (
                  <tr key={order.id}>
                    <td>{order._id}</td>
                    <td>{item.title}</td>
                    <td><img src={`http://localhost:3001/images/${item.image}`} alt={order.item} width="50" /></td>
                    <td>R {item.price}</td>
                    <td>{order.firstname + " " + order.lastname}</td>
                    <td>{order.email}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>{order.deliveredDate ? "Delivered" : "Not delivered"}</td>
                    <td>{order.address}</td>
                    <td style={{ color: 'green', fontWeight: 'bold' }}>{order.status}</td>
                    {user.isAdmin && <td>
                      <span><FontAwesomeIcon icon={faEdit} onClick={() => handleUpdate(order._id)} /></span>&nbsp;&nbsp;
                    </td>}
                  </tr>
                ))
              ))}
            </tbody> }
          </table>  : <h4 className="product-not-found">You have no orders that are {activeTab}</h4>}
        </div>
      </div>
    </div>
  );
};

export default OrderTabs;
