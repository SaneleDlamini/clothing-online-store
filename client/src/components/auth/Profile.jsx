import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Layout from '../UI/Layout';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname : '',
    lastname : '',
    email : '',
  })
  

  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async(e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/profile`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
  
        const data = await response.json();
        setData(data);
        
        if (response.ok) {
          console.log(user);
            navigate('/products')
        } else {
          console.error('update failed:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  return (
    <Layout>
      <div className='register-layout'>
        <Card title="PROFILE INFO" className='register-card'>
          <form>
            <div className='form-group'>
                <input type="text" name='firstname' placeholder='Enter your first name' onChange={handleInputChange} value={user.firstname} className='form-input' />
              </div>
            <div className='form-group'>
              <div className='form-group'>
                <input type="text" name='lastname' placeholder='Enter your last name' onChange={handleInputChange} value={user.lastname} className='form-input' />
              </div>
              <input type="text" name='email' placeholder='Enter your email' onChange={handleInputChange} value={user.email} className='form-input' />
            </div>
            <div className='form-group form-actions'>
              <Button onClick={handleUpdateProfile}>UPDATE</Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default Profile