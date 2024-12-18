import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import Layout from '../UI/Layout';
import Button from '../UI/Button'

const Register = () => {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errors, setErrors ] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if(!firstname || !lastname || !email || !password){
      setErrors("All fields are required");
      return;
    }

    const credentials = { firstname, lastname, email, password };

    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
          navigate('/login')
      } else {
        console.error('Login failed:', data.message);
        if(data.error){
          setErrors(data.error)
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <div className='register-layout'>
        <Card title="SIGN UP" className='register-card'>
        {errors && <p style={{ color: 'red', fontWeight : 'bold' }}>{errors}</p>}
          <form>
            <div className='form-group'>
              <input type="text" onChange={(e) => setFirstname(e.target.value)} value={firstname} placeholder='Enter your first name' className='form-input' />
            </div>
            <div className='form-group'>
              <div className='form-group'>
                <input type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} placeholder='Enter your last name' className='form-input' />
              </div>
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' className='form-input' />
            </div>
            <div className='form-group'>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your password' className='form-input' />
            </div>
            <div className='form-group form-actions'>
              <Button onClick={handleRegister}>SIGN UP</Button>
              <Button onClick={() => navigate("/login")}>LOGIN</Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default Register