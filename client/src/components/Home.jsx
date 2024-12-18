import React, {useState} from 'react';
import Layout from './UI/Layout';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Product from './Product/Product';
import shopping from '../images/shopping-image.png'
import Popular from './Popular';
import DeleteConfirmation from './UI/DeleteConfirmation';

const Home = () => {

  const navigate = useNavigate();
  const [ overlay, setOverlay ] = useState(false);

  const test = () => {
    setOverlay(true)
  }
  return (
    <>
    {overlay && <DeleteConfirmation />}
      <div className="home-wrapper">
        <Layout>
          <div className='home-outer-wrapper'>
            <div className='home-content'>
              <h1>SHOP QUALITY CLOTHING</h1>
              <h3>At an affordable price</h3>
              <button className='shop-button' onClick={() => navigate('/products')}>SHOP NOW<span>&nbsp;<FontAwesomeIcon icon={faArrowRight} /></span></button>
            </div>
            <div className='shopping-image'>
              <img src={shopping} />
            </div>
          </div>
        </Layout>
      </div>
      <Layout title="MOST POPULAR">
        {/* <Product /> */}
        <Popular />
      </Layout>
    </>
  )
}

export default Home