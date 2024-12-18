import React, { useState } from 'react';
import Card from '../UI/Card';
import Layout from '../UI/Layout';
import Button from '../UI/Button'

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Password reset email sent successfully');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Error sending password reset email');
    }
  };
  return (
    <Layout>
      <div className='login-layout'>
        <Card title="FORGOT PASSWORD" className='login-card'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} className='form-input' />
            </div>
            <div className='form-group form-actions'>
              <Button>SEND</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default ForgotPassword