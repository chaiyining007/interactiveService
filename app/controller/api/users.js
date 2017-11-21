const Controller = require('egg').Controller;
class UserController extends Controller {
    * create() {
        const { ctx, service } = this;
        const data = yield service.user.insert(ctx.request.body);
        const _body = { biz_action: 0 };
        if (data.id < 1) {
            _body.biz_action = 1;
            
            _body.msg = data.error || '账号已存在'
        } else {
            _body.data = data;
        }
        ctx.body = _body
    }
}
module.exports = UserController;