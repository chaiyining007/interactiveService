const path = require('path');
const BaseController = require(`${path.resolve('./app/base/BaseController.js')}`);
class TaskController extends BaseController {
    * index() {
        const { ctx, service } = this;
        const user = yield this.getUserData();
        const { success, data, error } = yield service.task.list(Object.assign(this.paginationData, {
            family_id: user.family_id,
        }));
        this.success(Object.assign({
            page_index: this.pageIndex,
            per_page: this.perPage
        }, data));
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

    * show() {
        const { ctx, service } = this;
        const { success, data, error } = yield service.task.detail({
            id: ctx.params.id,
        });

        if (success) {
            const { create_user_data, id } = data;
            const user = yield this.getUserData();
            create_user_data.task_count = yield service.task.count({
                create_user_id: create_user_data.id
            });

            data.run_users = yield service.task.task_run_user(id);
            data.setDataValue('is_run', false)
            if (user.id) {
                data.setDataValue('is_run', !!data.run_users.filter((data) => data.id === user.id).length);
            }
            this.success(data);
        } else {
            this.error(error || '任务不存在');
        }
    }

    * receive() {
        const { ctx, service } = this;
        const { success, data, error } = yield service.task.receive({
            user_token: this.token,
            task_id: ctx.params.id,
        });
        if (success) {
            this.success(data);
        } else {
            this.error(error);
        }
    }
}
module.exports = TaskController;