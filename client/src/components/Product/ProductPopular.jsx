import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import LoadingSpinner from '../UI/LoadingSpinner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/CartSlice';
// import PRODUCTS from '../../config/products';

const ProductPopular = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null);  
      try {
        const response = await fetch('http://localhost:3001/api/products/popular');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);
 

  return (
    <div>
      {loading && <LoadingSpinner/>}
      {!loading && <ProductItem products={data} />}
    </div>
  )
}

export default ProductPopular