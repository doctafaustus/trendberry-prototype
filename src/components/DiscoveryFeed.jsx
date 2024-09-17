import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from './Card';
import { FaChevronUp } from 'react-icons/fa';
import { TfiComment } from 'react-icons/tfi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { GrShare } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const DiscoveryFeed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
  
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products', {
          signal: abortController.signal,
        });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error:', error);
        }
      }
    };
  
    fetchProducts();
  
    return () => abortController.abort();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <header className="max-w-2xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Trendberry</h1>
        <p className="text-center text-gray-600">Discover and upvote the best products from emerging brands</p>
      </header>
      {products.map((product, index) => (
        <ProductPost key={index} {...product} />
      ))}
    </div>
  );
};

const ProductPost = ({ id, brand, productName, image, description, upvotes, comments }) => {
  const [votes, setVotes] = useState(upvotes);

  return (
    <Card className="mb-4 max-w-2xl mx-auto">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <button 
              variant="ghost" 
              size="icon" 
              onClick={() => setVotes(votes + 1)}
              className="text-gray-500 hover:text-blue-500 mb-1"
            >
              <FaChevronUp />
            </button>
            <span className="font-bold"> {votes}</span>
          </div>
          <div className="flex-grow">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 mr-2">
                <img src="https://i.ibb.co/yfVh53Y/js-bits-bill-logo-for-an-e-commerce-product-discovery-app-calle-06a7e3a4-d359-4881-8d76-d9a5847663db.webp" alt={brand} />
              </div>
              <span className="font-semibold text-sm text-gray-600">{brand}</span>
            </div>
            <Link to={`/product/${id}`}>
              <h2 className="text-xl font-bold mb-1 text-left">{productName}</h2>
            </Link>
            <p className="text-gray-700 mb-2 text-left">{description}</p>
            <Link to={`/product/${id}`}>
              <img 
                src={image} 
                alt={productName} 
                className="w-full rounded-md mb-4 h-[400px] object-cover cursor-pointer" 
              />
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-0 flex justify-between items-center">
        <div className="flex">
          <button className="text-gray-500 flex items-center p-2 text-sm">
            <TfiComment /> <span className="pl-2">{comments} Comments</span> 
          </button>
          <button className="text-gray-500 flex items-center p-2 text-sm">
            <IoShareSocialOutline /> <span className="pl-2">Share</span>
          </button>
        </div>
        <button className="text-blue-500 flex items-center text-sm">
          <GrShare /> <span className="pl-2">View Product</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default DiscoveryFeed;