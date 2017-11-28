const egg = require('egg');
class TaskService extends egg.Service {
    /**
     * 创建任务
     * @param {Object} task_data 任务信息
     * @param {Object} user_data 用户信息
     */
    * insert(task_data, user_data) {
        const { app, ctx } = this;
        const _task_data = Object.assign({
            create_user: user_data.id
        }, task_data);

        if (!_task_data.family_id) {
            _task_data.family_id = user_data.family_id;
        }
        let task, error;
        try {
            task = app.model.Task.build(_task_data);
            task = yield task.validate();
            task = yield task.save();
        }
        catch (e) {
            error = e.errors[e.errors.length - 1].message;
        }
        finally {
            console.log(task.get({ 'plain': true }))
            if (!error) {
                return { id: task.get({ 'plain': true }).id };
            }
            return { error }
        }
    }

    * list({ per_page, offset = 0, family_id }) {
        const { app, ctx } = this;
        const _where = {}, include = [];
        const User = app.model.User;
        const Task = app.model.Task;
        if (family_id) {
            _where.family_id = family_id;
        } else {
            include.push({
                model: User, as: "create_user_data", attributes: ['id', 'mobile', 'email', 'avatar', 'family_id']
            });
        }

        const tasks = yield Task.findAndCount({
            attributes: ['title', 'details', 'imgs', 'created_at', 'updated_at', 'family_id', ['create_user', 'create_user_id']],
            where: _where,
            limit: per_page,
            offset: offset,
            include: include
        });
        tasks.rows.forEach((data) => {
            data.imgs = JSON.parse(data.imgs);
        })
        return tasks;
    }
}
module.exports = TaskService;