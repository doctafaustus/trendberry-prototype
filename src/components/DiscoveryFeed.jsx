import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from './Card';
import { FaChevronUp } from 'react-icons/fa';
import { TfiComment } from 'react-icons/tfi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { GrShare } from 'react-icons/gr';

const ProductPost = ({ brand, productName, image, description, upvotes, comments }) => {
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
            <h2 className="text-xl font-bold mb-2 text-left">{productName}</h2>
            <p className="text-gray-700 mb-4 text-left">{description}</p>
            <img src={image} alt={productName} className="w-full rounded-md mb-4 h-[400px] object-cover" />
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
        <button className="text-blue-500 text-sm flex items-center text-sm">
          <GrShare /> <span className="pl-2">View Product</span>
        </button>
      </CardFooter>
    </Card>
  );
};

const DiscoveryFeed = () => {
  const [posts] = useState([
    { brand: "EcoWear", productName: "Sustainable Denim Jacket", image: "https://kittykush.co/cdn/shop/files/JarinCatnip_1.webp?v=1718583312", description: "Ethically made denim jacket from recycled materials. Perfect for any casual outfit.", upvotes: 128, comments: 24 },
    { brand: "TechGadgets", productName: "Smart Home Hub 2000", image: "https://m.media-amazon.com/images/I/819Nc-nureL._SX679_.jpg", description: "Control your entire home with voice commands. Compatible with all major smart home devices.", upvotes: 95, comments: 18 },
    { brand: "GourmetDelights", productName: "Artisanal Coffee Sampler", image: "https://cdn.thisiswhyimbroke.com/thumb/spyratwo-water-gun_400x333.jpg", description: "Experience a world tour of coffee with our curated selection of single-origin beans.", upvotes: 76, comments: 12 },
  ]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <header className="max-w-2xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Trendberry</h1>
        <p className="text-center text-gray-600">Discover and upvote the best products from emerging brands</p>
      </header>
      {posts.map((post, index) => (
        <ProductPost key={index} {...post} />
      ))}
    </div>
  );
};

export default DiscoveryFeed;