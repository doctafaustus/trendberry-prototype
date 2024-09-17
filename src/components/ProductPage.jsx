import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = ({ match }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  return product ? (
    <div>
      {
        JSON.stringify(product, null, 2)
      }
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProductPage;