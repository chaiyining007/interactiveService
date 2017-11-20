const egg = require('egg');
class TaskService extends egg.Service {
    * insert(data) {
        const { app, ctx } = this;
        console.log(111111,app.model)
        let task = yield app.model.Task.create(data);
        return task.get({ 'plain': true });
    }
}
module.exports = TaskService;