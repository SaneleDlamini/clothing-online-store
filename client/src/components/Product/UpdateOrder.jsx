import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Layout from '../UI/Layout';
import Button from '../UI/Button';

const UpdateOrder = () => {

    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ data, setData ] = useState([]);
    const [ status, setStatus ] = useState('');

    const { id } = useParams();

    const [order, setOrder] = useState({
        firstname : '',
        lastname : '',
        email : '',
        deliverDate : '',
        status : ''
      });

      // const formattedDate = new Date(order.deliverDate).toISOString().split('T')[0];

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true); 
          setError(null);  
          try {
            const response = await fetch(`http://localhost:3001/api/orders/${id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setOrder(result.order);
            console.log(order.createdAt)
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchData();
      }, [id]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;  
        setOrder(prevOrder => ({
          ...prevOrder,
          [name]: value  
        }));
      };
      

      const handleUpdateOrder = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(order),
            });
      
            const data = await response.json();
            setData(data);
            
            if (response.ok) {
              console.log(data)
                navigate('/orders')
            } else {
              console.error('update failed:', data.message);
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }


  return (
    <div>
        <Layout>
            <Card>
                <form className='update-order'>
                    <div className='form-group'>
                        <label>Customer Name</label><br />
                        <input type='text' name="firstname" className='update-order-field' onChange={handleInputChange} value={order.firstname} placeholder='customer name' />
                    </div>
                    <div className='form-group'>
                    <label>Customer Surame</label><br />
                        <input type='text' name="lastname" className='update-order-field' onChange={handleInputChange} value={order.lastname} placeholder='customer surname' />
                    </div>
                    <div className='form-group'>
                    <label>Customer Email</label><br />
                        <input type='text' name="email" className='update-order-field' onChange={handleInputChange} value={order.email} placeholder='customer email' />
                    </div>
                    <div className='form-group'>
                    <label>Delivery Date</label><br />
                        <input type='date' name="deliverdDate" className='update-order-field' onChange={handleInputChange} value={order.deliverDate} />
                    </div>
                    <div className='form-group'>
                    <label>Order Status</label><br />
                    <select className='update-order-select' name="status" onChange={handleInputChange} value={order.status}>
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="delivered">Delivered</option>
                        <option value="completed">Completed</option>
                    </select>
                    </div>
                    <div className='form-group'>
                    <Button onClick={handleUpdateOrder}>UPDATE ORDER</Button>
                    </div>
                </form>
            </Card>
        </Layout>
    </div>
  )
}

export default UpdateOrder