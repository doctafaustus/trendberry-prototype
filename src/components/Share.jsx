import React from 'react';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";

const Share = ({ trendberryUrl, productName }) => {
  const handleEmailShare = (shareUrl) => {
    const mailtoLink = `mailto:?subject=Check out this product I found on Trendberry&body=${shareUrl}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="share-icons flex max-w-[194px]">
      <div className="px-2 flex">
        <EmailShareButton url={trendberryUrl} onClick={() => handleEmailShare(trendberryUrl)}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
      <div className="px-2 flex">
        <FacebookShareButton url={trendberryUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
      <div className="px-2 flex">
        <RedditShareButton url={trendberryUrl} title={productName}>
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>
      <div className="px-2 flex">
        <TwitterShareButton url={trendberryUrl} title={productName}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
}

export default Share;

