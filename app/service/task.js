const path = require('path');
const BaseService = require(`${path.resolve('./app/base/BaseService.js')}`);
const include_create_user_attributes = ['id', 'name', 'mobile', 'email', 'avatar', 'family_id'];
class TaskService extends BaseService {
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
            if (error) {
                return this.error(error);
            }
            this.success({ id: task.get({ 'plain': true }).id });
        }
    }
    /**
     * 任务列表
     */
    * list({ per_page, offset = 0, family_id, user_id }) {
        const { app, ctx } = this;
        const _where = {}, include = [];
        const User = app.model.User;
        const Task = app.model.Task;

        if (user_id) {
            _where.create_user = user_id;
        }
        if (family_id) {
            _where.family_id = family_id;
        } else {
            include.push({
                model: User, as: "create_user_data", attributes: include_create_user_attributes
            });
        }

        const tasks = yield Task.findAndCount({
            attributes: Task.Attrs,
            where: _where,
            limit: per_page,
            offset: offset,
            include: include
        });
        tasks.rows.forEach((data) => {
            data.imgs = JSON.parse(data.imgs);
        });
        return this.success(tasks);
    }
    /**
     * 任务数
     */
    * count({ create_user_id, family_id }) {
        const { app, ctx } = this;
        const Task = app.model.Task;
        const _where = {};
        if (create_user_id) {
            _where.create_user = create_user_id;
        }
        if (family_id) {
            _where.family_id = family_id;
        }
        return yield Task.count({
            where: _where,
        });
    }
    * task_run(task_id) {
        const { app, ctx } = this;
        const include = [];
        const { User, Task, TaskRun } = app.model;
        include.push({
            model: User,
            as: "run_user",
            attributes: include_create_user_attributes
        });

        return yield TaskRun.findAll({
            where: {
                task_id: task_id
            },
            include: include
        });
    }
    * task_run_user(task_id) {
        let task_runs = yield this.task_run(task_id);
        const task_run_user = [];
        task_runs.forEach((data) => {
            task_run_user.push(data.run_user);
        });
        return task_run_user;
    }

    /**
     * 任务详情
     */
    * detail({ id }) {
        const { app, ctx } = this;
        const include = [];
        const { User, Task, TaskRun } = app.model;

        //任务创建人 相关信息
        include.push({
            model: User,
            as: "create_user_data",
            attributes: include_create_user_attributes,
        });
        yield this.task_run_user(1);
        //任务执行人 相关信息
        // include.push({
        //     model: TaskRun,
        //     as: "runs",
        //     include: [{
        //         model: User,
        //         as: "run_user",
        //         attributes: include_create_user_attributes
        //     }]
        // })
        const task = yield Task.findById(id, {
            attributes: Task.Attrs,
            include: include
        });
        if (task) {
            task.setDataValue('imgs', JSON.parse(task.getDataValue('imgs')));
            return this.success(task);
        }

        return this.error('任务不存在！');
    }
    /**
     * 更新任务
     */
    * update(data) {

    }
    /**
     * 创建任务执行
     */
    * create_task_run({ task_id, user_id }) {
        const { app, ctx } = this;
        const { TaskRun } = app.model;
        let task_run_created, task_run_id;
        yield TaskRun.findOrCreate({
            where: {
                task_id: task_id,
                user_id: user_id
            },
            defaults: {
                task_id: task_id,
                user_id: user_id
            }
        }).spread(function (data, created) {
            task_run_created = created;
            task_run_id = data.get({ 'plain': true }).id
        });
        if (task_run_created) {
            return this.success({
                id: task_run_id
            });
        } else {
            return this.error('重复领取！')
        }
    }

    /**
     * 接受任务
     */
    * receive({ task_id, user_data = {}, user_id = user_data.id, user_token, }) {
        const { app, ctx } = this;
        const { User, Task, TaskRun } = app.model;

        if (!user_id && user_token) {
            user_data = yield User.findOne({
                where: { authenticate_token: user_token }
            });
            user_id = user_data.id
        }
        if (!user_id) {
            return this.error('请先登录！');
        }
        const task = yield Task.findById(task_id);
        if (!task) {
            return this.error('任务不存在！')
        }
        if (task.status === Task.status.not_started || task.status === Task.status.processing) {
            let { success,data,error } = yield this.create_task_run({ user_id, task_id });
            if (success) {
                task.update({
                    status: Task.status.processing
                });
                return this.success({ task_run_id: data.id });
            }
            return this.error('重复领取！');
        } else {
            return this.error('任务已结束！');
        }
    }
}
module.exports = TaskService;