const egg = require('egg');
class Task extends egg.Service {
    * insert(data) {
        const { app, ctx } = this;
        let task = ctx.model.Task.build(data);
        task = yield task.save();
        // const { insertId } = yield app.mysql.insert('task', dataValues);
        return task.get({ 'plain': true });
    }
}
module.exports = Task;