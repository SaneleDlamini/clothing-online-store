import React from 'react';
import Card from '../UI/Card';
import Layout from '../UI/Layout';
import Button from '../UI/Button'

const UpdateUser = () => {
  return (
    <Layout>
      <div className='register-layout'>
        <Card title="SIGN UP" className='register-card'>
          <form>
            <div className='form-group'>
              <input type="password" placeholder='Enter your first name' value='Sanele' className='form-input' readOnly />
            </div>
            <div className='form-group'>
              <div className='form-group'>
                <input type="password" placeholder='Enter your last name' value='Dlamini' className='form-input' readOnly />
              </div>
              <input type="text" placeholder='Enter your email' value='Sanele@gmail.com' className='form-input' readOnly />
            </div>
            <div className='form-group'>
              <input type="checkbox" /> Is Admin
            </div>
            <div className='form-group form-actions'>
              <Button>UPDATE</Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default UpdateUser