const Controller = require('egg').Controller;
class TaskController extends Controller {
    * create() {
        const { ctx, service } = this;
        ctx.body = { biz_action: 0, data: {} };
    }
}
module.exports = TaskController;