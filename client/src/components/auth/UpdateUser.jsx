import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Card from '../UI/Card';
import Layout from '../UI/Layout';
import Button from '../UI/Button'

const UpdateUser = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user1, setUser1] = useState({
    firstname: '',
    lastname: '',
    email: '',
    isAdmin: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null);  
      try {
        const response = await fetch(`http://localhost:3001/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setUser1(result.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser1((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user1),
      });

      const data = await response.json();
      setData(data)
      if (response.ok) {
          navigate('/users')
      } else {
        console.error('update failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Layout>
      <div className='register-layout'>
        <Card title="SIGN UP" className='register-card'>
          <form>
            <div className='form-group'>
              <input type="text" name="firstname" readOnly onChange={handleInputChange} value={user1.firstname} placeholder='Enter your first name' className='form-input' />
            </div>
            <div className='form-group'>
              <div className='form-group'>
                <input type="text" name="lastname" readOnly onChange={handleInputChange} value={user1.lastname} placeholder='Enter your last name' className='form-input' />
              </div>
              <input type="text" name="email" readOnly onChange={handleInputChange} value={user1.email} placeholder='Enter your email' className='form-input' />
            </div>
              <input type='checkbox' name='isAdmin' checked={user1.isAdmin} onChange={handleInputChange} /> Is Admin?
            <div className='form-group form-actions'>
              <Button onClick={handleUpdate}>UPDATE</Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default UpdateUser