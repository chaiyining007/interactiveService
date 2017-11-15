module.exports = options => {
  return function* serverTime(next) {
    if (this.request.accept.headers.accept.indexOf('text/html') > -1) {
      this.base_data = {};
    }
    yield next;
  };
};
