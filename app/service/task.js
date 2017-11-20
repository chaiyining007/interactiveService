const egg = require('egg');
class Task extends egg.Service {
    * insert(data) {
        const { app, ctx } = this;
        console.log(app.model)
        let task = yield app.model.Tasks.create(data);
        return task.get({ 'plain': true });
    }
}
module.exports = Task;