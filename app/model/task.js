module.exports = app => {
    const { CHAR, TEXT, BIGINT, ENUM, } = app.Sequelize;
    const Task = app.model.define('task',
        {
            title: {
                type: CHAR(255),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "任务名不能为空！" }
                }
            },
            family_id: { type: CHAR(255), },
            create_user: { type: CHAR(255), },
            status: { type: ENUM('not_started', 'processing', 'carry_out', 'undone'), allowNull: false, defaultValue: 'not_started' },
            end_status: { type: ENUM('not_finished', 'end', 'delete', 'expired'), allowNull: false, defaultValue: 'not_finished' },
            details: {
                type: TEXT,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "任务详情不能为空！" }
                }
            },
            imgs: TEXT,
            created_at: {
                type: BIGINT,
                defaultValue() {
                    return + new Date();
                }
            },
            updated_at: {
                type: BIGINT,
                defaultValue() {
                    return + new Date();
                }
            },
        }, {
            getterMethods: {
                status_cn() {
                    return Task.status_cn[this.getDataValue('status')];
                },
                end_status_cn() {
                    return Task.end_status_cn[this.getDataValue('end_status')];
                },
                create_user_data() {
                    return this.getDataValue('create_user_data') || null;
                },
                run_users() {
                    return this.getDataValue('run_users') || []
                }
            },
            setterMethods: {
                create_user_data(value) {
                    this.setDataValue('create_user_data', value)
                },
                run_users(value) {
                    this.setDataValue('run_users', value)
                }
            }
        });

    Task.Attrs = ['id', 'title', 'details', 'imgs', 'created_at', 'updated_at', 'family_id', 'status', 'end_status', ['create_user', 'create_user_id']];
    Task.status = {
        get not_started() { return 'not_started' },
        get processing() { return 'processing' },
        get carry_out() { return 'carry_out' },
        get undone() { return 'undone' },
    };
    Task.status_cn = {
        get not_started() { return '未开始' },
        get processing() { return '进行中' },
        get carry_out() { return '完成' },
        get undone() { return '未完成' },
    };
    Task.end_status_cn = {
        get not_finished() { return '未结束' },
        get end() { return '已结束' },
        get delete() { return '已删除' },
        get expired() { return '已过期' },
    }
    Task.associate = function () {
        const User = app.model.models.user;
        const TaskRun = app.model.models.task_run;
        Task.belongsTo(User, { foreignKey: "create_user", as: "create_user_data" });
        Task.hasMany(TaskRun, { foreignKey: "task_id", as: "runs" })
    }
    return Task;
};
