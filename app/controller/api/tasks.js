const path = require('path');
const BaseController = require(`${path.resolve('./app/base/BaseController.js')}`);
class TaskController extends BaseController {
    * create() {
        const { ctx, service } = this;
        const user = yield this.getUserData();
        const data = yield service.task.insert(ctx.request.body,user);
        ctx.body = { biz_action: 0 };
    }
}
module.exports = TaskController;