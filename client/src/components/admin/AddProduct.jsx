import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Layout from '../UI/Layout';
import Card from '../UI/Card';
import Button from '../UI/Button';

const AddProduct = () => {

    const navigate = useNavigate();

    const [ errors, setErrors ] = useState("");

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [subCateGory, setSubCategory] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState([]);
    const [totalInStock, setTotalInStock] = useState('');
    const [file, setFile] = useState('');

    const [isOnFeatured, setIsOnFeatured] = useState(false);
    const [isOnSale, setIsOnSale] = useState(false);

    const handleOnFeatured = (e) => {
        setIsOnFeatured(!isOnFeatured)
    }

    const handleOnSale = (e) => {
        setIsOnSale(!isOnSale)
    }

    // Percent calculations
    useEffect(() => {
        const discountAmount = (discount / 100) * price;
        setSalePrice(price - discountAmount);
    }, [price, discount]);

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if(!title || !price || !description || !quantity || !category || !subCateGory || !gender || !totalInStock || !file){
            setErrors("Fields with asteric* are required");
            return;
          }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("salePrice", salePrice);
        formData.append("discount", discount);
        formData.append("onSale", isOnSale);
        formData.append("quantity", quantity);
        formData.append("category", category);
        formData.append("subCategory", subCateGory);
        formData.append("gender", gender);
        formData.append("totalInStock", totalInStock);
        formData.append("isFeatured", isOnFeatured);
        formData.append("image", file);


        try {
            const response = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/products')
            } else {
                console.error('Adding product failed:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }
    return (
        <div className='add-product-layout'>
            <Layout>
                <Card title='ADD PRODUCT' className='card-add-product'>
                {errors && <p style={{ color: 'red', fontWeight : 'bold' }}>{errors}</p>}
                    <form>
                        <div className='add-product-form-group'>
                            <input type='text' name="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Enter title*' />
                            <input type='number' name="price" onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Enter price*' />
                            <input type='number' name="quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} placeholder='Enter quantity*' />
                        </div>
                        <div className='add-product-form-group'>
                            <select name="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                                <option>Category*</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="footware">Footware</option>
                                <option value="hat">Hat</option>
                                <option value="hat">Jewellery</option>
                            </select>
                            <select name="subCategory" onChange={(e) => setSubCategory(e.target.value)} value={subCateGory}>
                                <option>SubCategory*</option>
                                <option value="jacket">Jacket</option>
                                <option value="tshirt">T-shirt</option>
                                <option value="shirt">Shirt</option>
                                <option value="sneaker">Sneaker</option>
                                <option value="she">Shoe</option>
                                <option value="hoody">Hoody</option>
                                <option value="golf-tshirt">Golf t-shirt</option>
                                <option value="trouser">Trouser</option>
                                <option value="socks">Socks</option>
                                <option value="vest">Vest</option>
                                <option value="shuit">shuit</option>
                                <option value="shuit">Skirt</option>
                                <option value="shuit">Dress</option>
                            </select>
                            <input type='number' name="totalInStock" onChange={(e) => setTotalInStock(e.target.value)} value={totalInStock} placeholder='Enter total in stock*' />
                        </div>
                        <div className='add-product-form-group'>
                            <select name="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                                <option>Gender based*</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="female">Kids</option>
                                <option value="other-gender">Other gender</option>
                            </select>
                            {/* <input type='text' name="size" onChange={(e) => setSize(e.target.value)} value={size} placeholder='Enter sale size' /> */}
                            <input type='number' name="discount" onChange={(e) => setDiscount(e.target.value)} value={discount} placeholder='Enter discount in %' />
                            <input type='number' name="sale-price" readOnly value={salePrice} placeholder='Sale price' />
                        </div>
                        <div className='radio-buttons'>
                            <div className='radio-group'>
                                <strong>Featured :</strong> <input type='checkbox' name="isFeatured" onChange={handleOnFeatured} checked={isOnFeatured} /> Yes
                            </div><br />
                            <div className='radio-group'>
                                <strong>On Sale :</strong> <input type='checkbox' onChange={handleOnSale} name="onSale" checked={isOnSale} /> Yes
                            </div>
                        </div>
                        <label for='image'>UPLOAD IMAGE <FontAwesomeIcon icon={faUpload} /></label>
                        <input type="file" id='image' name="image" onChange={(e) => setFile(e.target.files[0])} />
                        <div className='add-product-description'>
                            <textarea rows='5' name="description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='add-product-action'>
                            <Button onClick={handleAddProduct}>SAVE</Button>
                        </div>
                      
                    </form>

                </Card>
            </Layout>
        </div>
    )
}

export default AddProduct