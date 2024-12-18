import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import Layout from '../UI/Layout';
import Card from '../UI/Card';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setUsers(result.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onEdit = (id) => {
    navigate(`/update-user/${id}`)
  }

  return (
    <div className='users-layout'>
      <Layout>
        {loading ? <LoadingSpinner /> : 
        <Card title='LIST OF USERS' className='user-table-card'>
          {users.length > 0 ?
          <table>
            <tr>
              <th>Fisrt Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th colSpan={2}>Action</th>
            </tr>
            {users.map(user =>
              <tr>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "ADMIN" : "USER"}</td>
                <td><FontAwesomeIcon icon={faEdit} onClick={() => onEdit(user._id)} /></td>
                <td><FontAwesomeIcon icon={faTrash} /></td>
              </tr>
            )}
          </table> : <h4 className='product-not-found'>No users found</h4>}
        </Card>}
      </Layout>
    </div>
  )
}

export default Users