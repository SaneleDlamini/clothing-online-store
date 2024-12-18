import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../UI/Layout';
import Product from './Product';

const Products = () => {

  const [ searchTerm, setSearchTerm ] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');


  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const navigateToAddProduct = () => {
    navigate('/add-product')
  }

  const handleCrearFilters = () => {
    setSearchTerm("");
    setGenderFilter("");
    setCategoryFilter("")
  }
  return (
    <div className='products-layout'>
      <Layout title='LIST OF PRODUCTS'>
        <div className='filter-and-add-product'>
          <input type='text' className='search-filter' onChange={(e) => setSearchTerm(e.target.value)} placeholder='search here...' />
          <select className='dropdown-filter'
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">filter by category</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="footwear">Footwear</option>
            <option value="hat">Hat</option>
          </select>
          <select className='dropdown-filter'
             value={genderFilter}
             onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">Filter by gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="boy">boy</option>
            <option value="girl">girl</option>
          </select>
          <button className='clear-filters' onClick={handleCrearFilters}>Clear filters</button>
          {user && user.isAdmin && <button className='add-new-product-button' onClick={navigateToAddProduct}>ADD NEW PRODUCT &nbsp;<FontAwesomeIcon icon={faPlus} /></button>}
        </div><br /><br />
        <Product searchTerm={searchTerm} gender={genderFilter} category={categoryFilter} />
      </Layout>
    </div>
  )
}

export default Products