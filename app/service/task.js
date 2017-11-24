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
            if (!error) {
                return { id: task.get({ 'plain': true }).id };
            }
            return { error }
        }
    }
}
module.exports = TaskService;