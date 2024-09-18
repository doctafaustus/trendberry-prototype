import React, { useState } from 'react';
import { Card, CardContent } from './Card';
import loading from '/loading.gif'

const ProductSubmissionForm = () => {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    brand: '',
    productName: '',
    description: '',
    imageUrl: ''
  });

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('http://localhost:3001/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productUrl: url,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setProductData(data);
      setIsLoading(false);
      setStep(2);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleDataUpdate = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting product data:', productData);
    setStep(3);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto text-left">
      <CardContent className="p-6 min-w-[462px]">
        <h2 className="text-2xl font-bold mb-4">Submit a Product</h2>
        {step === 1 && (
          <form onSubmit={handleUrlSubmit}>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Product URL
              </label>
              <input
                id="url"
                type="url"
                placeholder="https://example.com/product"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            {isLoading ? (<img src={loading} alt="Loading image" className="mx-auto w-[20px]" /> ) :
              (
                <button type="submit" disabled={isLoading} className="bg-black text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-4 py-2 w-full">
                  Submit URL
                </button>
              )
            }           
          </form>
        )}
        {step === 2 && (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product Details</h2>
            
            <div className="mb-6">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                value={productData.brand}
                onChange={(e) => handleDataUpdate('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={productData.productName}
                onChange={(e) => handleDataUpdate('productName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={productData.description}
                onChange={(e) => handleDataUpdate('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                value={productData.image}
                onChange={(e) => handleDataUpdate('imageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {productData.image && (
              <div className="mb-6">
                <p className="block text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                <img 
                  src={productData.image} 
                  alt="Product" 
                  className="w-full h-64 object-cover rounded-md" 
                />
              </div>
            )}

            <button 
              onClick={handleSubmit}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Submit Product
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p>Your product has been submitted successfully.</p>
            <button onClick={() => {setStep(1); setUrl('');}} className="mt-4">
              Submit Another Product
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSubmissionForm;