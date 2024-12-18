import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmation from '../UI/DeleteConfirmation';
import { addToCart } from '../../store/CartSlice';
import image1 from '../../images/dress8.png';

const ProductItem = ({ products }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      onSale: product.onSale,
      salePrice: product.salePrice
    }))
  }

  const onNavigateToEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/update-product/${id}`)
  }

  const onDeleteProduct = async (e, id) => {
    // e.stopPropagation();

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/products');

      const result = await response.json();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      navigate('/products')
    }
  }

  const handleOnDelete = (e, id) => {
    e.stopPropagation();
    setIsDeleting(true);
    // completeDelete(id)
  }

  const handleOnCancel = (cancelStatus) => {
    setIsDeleting(cancelStatus);
  }
  // const completeDelete = (id) => {
  //   onDeleteProduct(id)
  // }

  return (
    <>
      {products.length > 0 ? <>
        {products.map(product => (
          <>
            {isDeleting && <DeleteConfirmation id={product._id} onDelete={isDeleting} onCancel={handleOnCancel} handleDeletingProduct={onDeleteProduct} />}
            <div className='product-wrapper' onClick={() => navigate(`/product/${product._id}`)}>
              <img src={`http://localhost:3001/images/${product.image}`} className='product-image' />
              <h2 className='product-title'>{product.title}</h2>
              <div className='prices'>
                <span className={product.onSale ? 'product-price' : ''}>R{product.price}</span>
                {product.onSale && <span className='sale-price'>R{product.salePrice}</span>}
              </div>
              <button className='cart-button' onClick={(e) => handleAddToCart(e, product)}>Add to cart</button>
              {product.onSale && product.discount ? <span className='sale-tag'>- {product.discount}% off</span> : ""}
              {user && user.isAdmin && <span className='product-admin-action'>
                <span><FontAwesomeIcon icon={faEdit} onClick={(e) => onNavigateToEdit(e, product._id)} /></span>&nbsp;
                <span><FontAwesomeIcon icon={faTrash} onClick={(e) => handleOnDelete(e, product._id)} /></span>
              </span>}
            </div>
          </>
        ))}
      </> : <h4 className='product-not-found'>No prducts found</h4>}
    </>
  )
}

export default ProductItem