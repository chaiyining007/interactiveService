

module.exports = app => {
    const { CHAR, TEXT, BIGINT, ENUM } = app.Sequelize;
    const User = require('./user')(app);
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
                }
            }
        });
    Task.belongsTo(User, { foreignKey: "create_user", as: 'create_user_data' });
    Task.status_cn = {
        not_started: "未开始",
        processing: "进行中",
        carry_out: "完成",
        undone: "未完成"
    };
    Task.end_status_cn = {
        not_finished: "未结束",
        end: "已结束",
        delete: "已删除",
        expired: "已过期"
    }
    return Task;
};
