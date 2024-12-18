import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import LoadingSpinner from '../UI/LoadingSpinner';
import axios from 'axios';

const Product = ({searchTerm, gender, category}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredClothing, setFilteredClothing] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  console.log(gender, searchTerm, category)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null);  
      try {
        const queryParams = new URLSearchParams({
          searchTerm,
          gender: gender,
          category: category,
          page: currentPage,
          limit: itemsPerPage,
        });

        const response = await fetch(`http://localhost:3001/api/products?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // setData(result.products);
        setFilteredClothing(result.products)
        setTotalPages(result.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [searchTerm, gender, category, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };


  return (
    <>
    <div>
      {loading && <LoadingSpinner />}
      {!loading && <ProductItem products={filteredClothing} />}
    </div>

    <div className='pagination'>
        <button className='pagination-actions' onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button className='pagination-actions' onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  )
}

export default Product