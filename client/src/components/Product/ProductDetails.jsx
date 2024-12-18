import { React, useState, useEffect } from 'react';
import Layout from '../UI/Layout';
import Card from '../UI/Card';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/CartSlice';
import image1 from '../../images/hoody1.png';
import image2 from '../../images/t-shirt.png';

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null);  
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.product);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const addToCartHandler = () => {
    dispatch(addToCart({
      id : data._id,
      title : data.title,
      price : data.price,
      image : data.image,
      onSale : data.onSale,
      salePrice : data.salePrice
    }));
  };

  return (
    <div className='product-details-layout'>
      <Layout>
        <Card className='card-product-detail' title="PRDUCT DETAILS">
          <div>
          <div className='product-details-content'>
            <div className='product-details-image'>
              <img src={`http://localhost:3001/images/${data.image}`} />
            </div>
            <div className='product-details-summery'>
              <h4>{data.title}</h4><hr />
              <div className='product-details-price'>
                <h4>PRICE</h4>
                <h4 style={{ color : data.onSale ? "red" : "black" }}>R{data.onSale ? data.salePrice : data.price}</h4>
              </div>
              <div className='product-details-details'>
              <div className='product-details-stock'>
                  {/* <button className='stock-button'>IN STOCK</button> */}
                  <select className='sizes'>
                    <option>Select Size</option>
                    <option>XXS</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>
                </div>
                <div className='product-details-quantity'>
                  <h4>QUANTITY : <input type='text' readOnly value='1'/></h4>
                </div>
                
              </div>
              <div className='product-details-cart'>
              <button onClick={addToCartHandler}>ADD TO CART</button>
              </div><br />
              
            </div>
          </div>
          </div>
          <div className='discription'>
            <h4>DESCRIPTION</h4>
              <p>
            {data.description}
          </p>
              </div>
          
        </Card>
      </Layout>
    </div>
  )
}

export default ProductDetails