const Controller = require('egg').Controller;
class BaseController extends Controller {
    * getUserData() {
        const { ctx, service } = this;
        const { headers } = ctx;
        const token = headers['x-auth-token'];
        const data = yield service.user.get({ authenticate_token: token });
        return data;
    }
    success(data) {
        this.ctx.body = {
            success: true,
            data,
        };
    }
    warn(msg, data) {
        this.ctx.body = {
            warn: msg,
            data,
        };
    }
    error(msg) {
        this.ctx.body = {
            error: msg
        };
    }
}
module.exports = BaseController;