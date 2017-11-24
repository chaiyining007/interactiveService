const egg = require('egg');
class TaskService extends egg.Service {
    /**
     * 创建任务
     * @param {Object} taskData 任务信息
     * @param {Object} userData 用户信息
     */
    * insert(taskData,userData) {
        const { app, ctx } = this;
        let task = yield app.model.Task.create(data);
        return task.get({ 'plain': true });
    }
}
module.exports = TaskService;