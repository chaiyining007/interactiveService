const path = require('path');
const BaseController = require(`${path.resolve('./app/base/BaseController.js')}`);

class UserController extends BaseController {
    * create() {
        const { ctx, service } = this;
        const data = yield service.user.insert(ctx.request.body);
        if (data.id < 1) {
            this.error(data.error || '账号已存在');
        } else {
            this.success(data)
        }
    }

    * login() {
        const { ctx, service } = this;
        const data = yield service.user.get(ctx.request.body);

        if (data.authenticate_token) {
            ctx.session[data.authenticate_token] = data;
            this.success({ authenticate_token: data.authenticate_token })
        } else {
            this.error(data.error);
        }
    }
}
module.exports = UserController;