const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(function () {
      func.apply(this, args);
    }, delay);
  };
};

export default debounce;
