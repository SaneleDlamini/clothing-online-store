import logo from './logo.svg';
import './css/style.css';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Layout from './components/UI/Layout';
import Home from './components/Home';
import Footer from './components/Footer'
import Products from './components/Product/Products';
import Cart from './components/Product/Cart';
import Orders from './components/Product/Orders';
import UpdateOrder from './components/Product/UpdateOrder';
import Checkout from './components/Product/Checkout';
import Product from './components/Product/Product';
import ProductDetails from './components/Product/ProductDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import ForgotPassword from './components/auth/ForgotPassword';
import NotFound from './components/UI/NotFound';
import AddProduct from './components/admin/AddProduct';
import ResetPassword from './components/auth/ResetPassword';
import UpdateUser from './components/auth/UpdateUser';
import Sale from './components/Product/Sale';
import UpdateProduct from './components/admin/UpdateProduct';
import SuccessPayment from './components/SuccessPayment';
import PaymentCancelled from './components/PaymentCancelled';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './components/user/Users';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './store/AuthSlice';
import {jwtDecode} from 'jwt-decode';

function App() {
  const router = createBrowserRouter([
    { path : '/', 
      element : <Navigation />,
      errorElement: <NotFound />,
      children : [
        { index: true, element : <Home /> },
        { path : 'products', element : <Products /> },
        { path : 'product/:id', element : <ProductDetails /> },
        { path : 'cart', element : <Cart /> },
        { path : 'orders', element : <Orders /> },
        { path : 'update-order/:id', element : <UpdateOrder /> },
        { path : 'login', element : <Login /> },
        { path : 'register', element : <Register /> },
        { path : 'profile', element : <Profile /> },
        { path : 'add-product', element : <AddProduct /> },
        { path : 'users', element : <Users /> },
        { path : 'sale', element : <Sale /> },
        { path : 'forgot-password', element : <ForgotPassword /> },
        { path : 'reset-password/:token', element : <ResetPassword /> },
        { path : 'update-user/:id', element : <UpdateUser /> },
        { path : 'update-product/:id', element : <UpdateProduct /> },
        { path : 'payment-successful', element : <SuccessPayment /> },
        { path : 'payment-cancelled', element : <PaymentCancelled /> },
      ]
    }
  ])

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(loginSuccess(decoded));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <RouterProvider router={router}>
        <Layout>
           <Navigation />
        </Layout>
      </RouterProvider>
      <Footer />
    </div>
  );
}

export default App;
