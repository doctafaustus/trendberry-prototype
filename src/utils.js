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
};

export default utils;