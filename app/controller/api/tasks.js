const path = require('path');
const BaseController = require(`${path.resolve('./app/base/BaseController.js')}`);
class TaskController extends BaseController {
    * index() {
        const { ctx, service } = this;
        const user = yield this.getUserData();
        const tasks = yield service.task.list(Object.assign(this.paginationData, {
            family_id: user.family_id,
        }));
        this.success(Object.assign({
            page_index: this.pageIndex,
            per_page: this.perPage
        }, tasks));
    }

    * create() {
        const { ctx, service } = this;
        const user = yield this.getUserData();
        if (!user.id) {
            this.error('请先登录！');
            return
        }
        const data = yield service.task.insert(ctx.request.body, user);
        if (data.id && data.id > 0) {
            this.success(data);
        } else {
            this.error(data.error);
        }
    }
}
module.exports = TaskController;