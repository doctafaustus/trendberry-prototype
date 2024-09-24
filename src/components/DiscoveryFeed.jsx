import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter } from './Card';
import { FaChevronUp } from 'react-icons/fa';
import { TfiComment } from 'react-icons/tfi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { GrShare } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Share from './Share';
import useShareBoxHandler from '../hooks/useShareBoxHandler';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product, index) => (
        <div className="w-full" key={index}>
          <ProductPost key={index} {...product} />
        </div>
      ))}
    </div>
  </div>
  );
};

const ProductPost = ({ id, productUrl, brand, productName, image, description, upvotes, comments }) => {
  const [votes, setVotes] = useState(upvotes);
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef();

  useShareBoxHandler(shareRef, '.share-btn', showShare, setShowShare);

  return (
    <Card className="flex flex-col h-full mb-2 max-w-2xl mx-auto">
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4 hidden">
            <button 
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
            <h2 className="text-xl font-bold mb-3 text-left break-words overflow-hidden">{productName}</h2>
            </Link>
            <p className="text-gray-700 mb-2 text-left hidden">{description}</p>
            <Link to={`/product/${id}`}>
              <div className="relative pb-[75%]">
                <img 
                  src={image} 
                  alt={productName} 
                  className="absolute w-full h-full object-cover rounded-md cursor-pointer" 
                />
              </div>
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-4 py-0 flex justify-between items-center relative">
        <div className="flex">
          <Link to={{ pathname: `/product/${id}` }} state={{ scrollToComments: true }}>
            <button className="text-gray-500 flex items-center p-2 text-sm">
              <TfiComment /> <span className="pl-2">{comments} Comments</span> 
            </button>
          </Link>
          {showShare && (
            <div ref={shareRef} className="absolute bg-white bottom-[41px] left-[65px] p-2 rounded-lg shadow-lg">
              <Share trendberryUrl={productUrl} productName={productName} />
            </div>
          )}
          <button className="text-gray-500 flex items-center p-2 text-sm" onClick={() => setShowShare(true)}>
            <IoShareSocialOutline /> <span className="pl-2">Share</span>
          </button>
        </div>
        <a href={productUrl} target="_blank" rel="noopener noreferrer">
          <button className="text-blue-500 flex items-center text-sm">
            <GrShare /> <span className="pl-2 hidden">View Product</span>
          </button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default DiscoveryFeed;