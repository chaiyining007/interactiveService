module.exports = options => {
    return function* mustLogIn(next) {
        const { headers } = this;
        const token = headers['x-auth-token'];
        if (token) {
            yield next;
        }
        else {
            this.status = 401;
            this.body = {
                msg: "请先登录"
            }
        }
    };
};
