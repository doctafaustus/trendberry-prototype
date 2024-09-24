const utils = {
  waitFor(conditionFn, callback, interval = 50, expiration = 5000) {
    // If element found, call callbacks
    if (conditionFn()) {
      callback();
    // If time has expired, return
    } else if (expiration <= 0) {
      return;
    // Otherwise, try again and decrement expiration
    } else {
      expiration -= interval;
      return setTimeout(this.waitFor.bind(null, conditionFn, callback, interval, expiration), interval);
    }
  },

  optimizeGridUI() {
    const cardContainers = [...document.querySelectorAll('.product-card-container')];
    const totalCards = cardContainers.length;
    const groupSize = 4;
    const totalGroups = Math.ceil(totalCards / groupSize);
    console.log('Total groups:', totalGroups);
    // Initialize an array to hold the maximum heights for each group
    const maxHeights = [];
    // Process each group
    for (let groupIndex = 0; groupIndex < totalGroups; groupIndex++) {
      const groupStart = groupIndex * groupSize; // Starting index for the group
      const groupEnd = Math.min(groupStart + groupSize, totalCards); // Ending index for the group
      const groupCards = cardContainers.slice(groupStart, groupEnd); // Get the cards in the current group
      let maxHeight = 0; // Variable to track the maximum height in the group
      // Calculate the max height for the current group based on .product-title
      groupCards.forEach((el) => {
        const titleHeight = el.querySelector('.product-title').clientHeight; // Use the clientHeight of the .product-title
        console.log('Title height for card:', titleHeight);
        // Update maxHeight if the current card's title height is greater
        if (titleHeight > maxHeight) {
          maxHeight = titleHeight;
        }
      });
      // Store the maximum height for the current group
      maxHeights.push(maxHeight);
      console.log(`Max height for group ${groupIndex + 1}:`, maxHeight);
      // Adjust heights of the product image containers
      groupCards.forEach((el) => {
        const productImageContainer = el.querySelector('.product-image-container').querySelector('img');
        const titleHeight = el.querySelector('.product-title').clientHeight; // Get the current title's height
        // Calculate the height difference
        const heightDifference = maxHeight - titleHeight;
        // If the current title height is less than the max, adjust the product image container's height
        if (heightDifference > 0) {
          const currentImageHeight = productImageContainer.clientHeight; // Get current image container height
          productImageContainer.style.maxHeight = `${currentImageHeight + heightDifference}px`; // Increase the height
        }
      });
    }
    // Now maxHeights contains the maximum heights for each group
    console.log('Maximum heights for all groups:', maxHeights);
  }
};

export default utils;