import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Layout from '../UI/Layout';
import Card from '../UI/Card';
import Button from '../UI/Button';

const UpdateProduct = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ errors, setErrors ] = useState("");

    const [ file, setFile ] = useState('');
    const [ data, setData ] = useState([]);
    // const [discount, setDiscount] = useState('');

    const [product, setProduct] = useState({
      title : '',
      price : '',
      description : '',
      salePrice : '',
      discount : '',
      quantity : '',
      category : '',
      subCateGory : '',
      totalInStock : '',
      gender : '',
      size : '',
      onSale : false,
      isFeatured : false
    });
   
    // % calculations
    useEffect(() => {
      const discountAmount = (product.discount / 100) * product.price;
      setProduct((prevState) => ({
        ...prevState,
        salePrice : product.price - discountAmount
      }));
  }, [product.price, product.discount]);


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
            setProduct(result.product);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchData();
      }, [id]);

    const handleUpdateProduct = async(e) => {
        e.preventDefault();

        if(!product.title || !product.price || !product.description || !product.quantity || !product.category || product.subCateGory || !product.gender || !product.totalInStock ){
          setErrors("Fields with asteric* are required");
          return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(product),
            });
      
            const data = await response.json();
            setData(data);
            
            if (response.ok) {
              console.log(data)
                navigate('/products')
            } else {
              console.error('update failed:', data.message);
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

  return (
    <div className='add-product-layout'>
        <Layout>
            <Card title='UPDATE PRODUCT' className='card-add-product'>
            {errors && <p style={{ color: 'red', fontWeight : 'bold' }}>{errors}</p>}
                <form>
                    <div className='add-product-form-group'>
                       <input type='text' name="title" onChange={handleInputChange} value={product.title} placeholder='Enter title*' />
                       <input type='number' name="price" onChange={handleInputChange} value={product.price} placeholder='Enter price*' />
                       <input type='number' name="quantity" onChange={handleInputChange} value={product.quantity} placeholder='Enter quantity*' />
                    </div>
                    <div className='add-product-form-group'>
                       <select name="category" onChange={handleInputChange} value={product.category}>
                        <option>Category*</option>
                        <option value="top">Top</option>
                        <option  value="bottom">Bottom</option>
                        <option  value="footware">Footware</option>
                        <option  value="hat">Hat</option>
                       </select>
                       <select name="subCategory" onChange={handleInputChange} value={product.subCateGory}>
                        <option>Sub Category*</option>
                        <option value="jacket">Jacket</option>
                        <option  value="tshirt">T-shirt</option>
                        <option  value="shirt">Shirt</option>
                        <option  value="sneaker">Sneaker</option>
                        <option  value="she">Shoe</option>
                        <option  value="hoody">Hoody</option>
                        <option  value="golf-tshirt">Golf t-shirt</option>
                        <option  value="trouser">Trouser</option>
                        <option  value="socks">Socks</option>
                        <option  value="vest">Vest</option>
                        <option  value="shuit">shuit</option>
                        <option  value="shuit">Skirt</option>
                        <option  value="shuit">Dress</option>
                       </select>
                       <input type='number' name="totalInStock" onChange={handleInputChange} value={product.totalInStock} placeholder='Enter total in stock*' />
                    </div>
                    <div className='add-product-form-group'>
                       <select name="gender" onChange={handleInputChange} value={product.gender}>
                        <option>Gender based*</option>
                        <option value="male">Male</option>
                        <option  value="female">Female</option>
                        <option  value="female">Kids</option>
                        <option  value="other-gender">Other gender</option>
                       </select>
                       <input type='number' name="discount" onChange={handleInputChange} value={product.discount} placeholder='Enter discount in %' />
                       <input type='number' name="salePrice" onChange={handleInputChange} value={product.salePrice} placeholder='Enter sale price' />
                    </div>
                    <div className='radio-buttons'>
                        <div className='radio-group'>
                            <strong>Featured :</strong> <input type='checkbox' name="isFeatured" checked={product.isFeatured} onChange={handleInputChange} /> Yes 
                        </div><br />
                        <div className='radio-group'>
                            <strong>On Sale :</strong> <input type='checkbox' name="onSale" checked={product.onSale} onChange={handleInputChange}  /> Yes  
                        </div>
                    </div>
                        <label for='image'>UPLOAD IMAGE <FontAwesomeIcon icon={faUpload} /></label>
                        <input type="file" id='image' name="image" onChange={handleInputChange} />
                    <div className='add-product-description'>
                        <textarea rows='5' name="description" onChange={handleInputChange} value={product.description}></textarea>
                    </div>
                    <div className='add-product-action'>
                        <Button onClick={handleUpdateProduct}>UPDATE</Button>
                    </div>
                </form>
            </Card>
        </Layout>
    </div>
  )
}

export default UpdateProduct