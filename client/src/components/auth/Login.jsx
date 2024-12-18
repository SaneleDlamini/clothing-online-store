import { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { signIn, signOut } from '../../store/AuthSlice';
import { loginStart, loginSuccess, loginFailure, logout } from '../../store/AuthSlice';
import Card from '../UI/Card';
import Layout from '../UI/Layout';
import Button from '../UI/Button'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errors, setErrors ] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    if(!email || !password){
      setErrors("All fields are required");
      return;
    }

    const credentials = { email, password };

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess(data.user))
          localStorage.setItem("token", data.token);
          navigate('/products')
      } else {
        dispatch(loginFailure('Login failed:', data.error));
        if(data.error){
          setErrors(data.error)
        }
      }
    } catch (error) {
      dispatch(loginFailure(error.data.message))
    }
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  }


  return (
    <Layout>
      <div className='login-layout'>
        <Card title="LOGIN" className='login-card'>
        {errors && <p style={{ color: 'red', fontWeight : 'bold' }}>{errors}</p>}
          <form>
            <div className='form-group'>
              <input type="text" required onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' className='form-input' />
            </div>
            <div className='form-group'>
              <input type="password" required onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your password' className='form-input' />
            </div>
            <span>Forgot password? <span style={{color : 'blue', cursor:'pointer'}} onClick={() => navigate('/forgot-password')}>Click here</span></span>
            <div className='form-group form-actions'>
              <Button onClick={handleLogin}>LOGIN</Button>
              <Button onClick={() => navigate('/register')}>SIGN UP</Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

export default Login