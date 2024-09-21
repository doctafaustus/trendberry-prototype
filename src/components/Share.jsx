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
    <div className="share-icons">
      <EmailShareButton url={trendberryUrl} onClick={() => handleEmailShare(trendberryUrl)}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <FacebookShareButton url={trendberryUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <RedditShareButton url={trendberryUrl} title={productName}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <TwitterShareButton url={trendberryUrl} title={productName}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}

export default Share;

