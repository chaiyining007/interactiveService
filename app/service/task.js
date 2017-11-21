const egg = require('egg');
class TaskService extends egg.Service {
    * insert(data) {
        const { app, ctx } = this;
        let task = yield app.model.Task.create(data);
        return task.get({ 'plain': true });
    }
}
module.exports = TaskService;