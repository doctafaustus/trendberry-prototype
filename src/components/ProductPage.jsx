import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from './Card';
import { FaChevronUp } from 'react-icons/fa';
import { TfiComment } from 'react-icons/tfi';
import { IoShareSocialOutline } from 'react-icons/io5';
import Share from './Share';
import useShareBoxHandler from '../hooks/useShareBoxHandler';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef();

  useShareBoxHandler(shareRef, '.share-btn', showShare, setShowShare);
  
  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        setProduct(data);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}/comments`)
      .then(response => response.json())
      .then(data => {
        console.log('comments', data);
        setComments(data)
      })
      .catch(error => console.error('Error:', error));
  }, [id]);




  const handleUpvote = () => {
    setProduct(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
    // Here you would also make an API call to update the upvote count on the server
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        user: 'user000',
        createdAt: new Date().toISOString()
      };
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');


      fetch('http://localhost:3001/api/add-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id, ...newCommentObj}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  if (!product) return <div>Loading...</div>;


  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-8 text-left">
          <CardContent className="p-6 relative">
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-6">
                <button 
                  onClick={handleUpvote}
                  className="text-gray-500 hover:text-blue-500 mb-1"
                >
                  <FaChevronUp size={24} />
                </button>
                <span className="font-bold text-lg">{product.upvotes}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <img src="https://i.ibb.co/yfVh53Y/js-bits-bill-logo-for-an-e-commerce-product-discovery-app-calle-06a7e3a4-d359-4881-8d76-d9a5847663db.webp" alt={product.brand} className="h-10 w-10 mr-3" />
                  <span className="font-semibold text-lg text-gray-700">{product.brand}</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
                <p className="text-gray-700 mb-2 text-lg">{product.description}</p>
                <img 
                  src={product.image} 
                  alt={product.productName} 
                  className="w-full rounded-lg mb-2 max-h-[600px] object-cover" 
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="text-gray-600 flex items-center">
                      <TfiComment className="mr-2" /> {comments.length} Comments
                    </button>
                    {showShare && (
                      <div ref={shareRef} className="absolute bg-white bottom-[77px] left-[229px] p-2 rounded-lg shadow-lg">
                        <Share trendberryUrl={product.productUrl} productName={product.productName} />
                      </div>
                    )}
                    <button className="text-gray-600 flex items-center share-btn" onClick={() => setShowShare(true)}>
                      <IoShareSocialOutline className="mr-2" /> Share
                    </button>
                  </div>
                  <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                    View Product
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-8 text-left">
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Add a comment..."
              ></textarea>
              <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                Post Comment
              </button>
            </form>
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 bg-gray-300 rounded-full mr-2"></div>
                    <span className="font-semibold">{comment.user}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-left">{comment.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;