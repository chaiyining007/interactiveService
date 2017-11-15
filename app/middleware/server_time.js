module.exports = options => {
  return function* serverTime(next) {
    yield next;
    if (this.request.accept.headers.accept.indexOf('application/json') > -1&&this.response.status===200) {
      this.body.server_time = +new Date();
    }
  };
};
