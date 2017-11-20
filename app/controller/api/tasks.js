const Controller = require('egg').Controller;
class TaskController extends Controller {
    * create() {
        const { ctx, service } = this;
        const data = yield service.task.insert(ctx.request.body);
        ctx.body = { biz_action: 0, data: data };
    }
}
module.exports = TaskController;