const path = require('path');
const BaseController = require(`${path.resolve('./app/base/BaseController.js')}`);
class TaskController extends BaseController {
    * create() {
        const { ctx, service } = this;
        const user = yield this.getUserData();
        const data = yield service.task.insert(ctx.request.body, user);
        if (data.id && data.id > 0) {
            this.success(data)
        } else {
            this.error(data.error);
        }
    }
}
module.exports = TaskController;