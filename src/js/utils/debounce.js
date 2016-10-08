
export default (cb, wait) => {
  let timeout;
  return () => {
    const later = () => {
      timeout = null;
      cb(arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (!timeout) cb(arguments);
  };
};
