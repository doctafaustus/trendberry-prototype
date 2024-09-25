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

  optimizeProductTitleSizes() {
    const productTitles = [...document.querySelectorAll('.product-title')];
    productTitles.forEach(title => {
      title.classList.remove('over-2-lines', 'is-2-lines');

      const over2Lines = title.clientHeight > 56;
      const is2Lines = title.clientHeight === 56;

      if (is2Lines) {
        title.classList.add('is-2-lines');
      }

      if (over2Lines) {
        title.classList.add('over-2-lines');
      }
    });

  }
};

export default utils;