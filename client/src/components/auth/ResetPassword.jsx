import React, { useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import Card from '../UI/Card';
import Layout from '../UI/Layout';
import Button from '../UI/Button'

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully');
        alert("Password updated successfully...")
          navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Error resetting password');
    }
  };

  return (
    <Layout>
      <div className='login-layout'>
        <Card title="RESET PASSWORD" className='login-card'>
          <form onSubmit={handleUpdate}>
            <div className='form-group'>
              <input type="password" name='password' value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' className='form-input' />
            </div>
            <div className='form-group'>
              <input type="password" name='confirm-password' value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' className='form-input' />
            </div>
            <div className='form-group form-actions'>
              <Button>UPDATE</Button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default ResetPassword