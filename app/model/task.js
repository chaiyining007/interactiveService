module.exports = app => {
    const { CHAR, TEXT, BIGINT } = app.Sequelize;

    const Task = app.model.define('task', {
        title: {
            type: CHAR(255),
            allowNull: false,
            validate: {
                notEmpty: { msg: "任务名不能为空！" }
            }
        },
        family_id: { type: CHAR(255), },
        create_user: { type: CHAR(255), },
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
    });
    return Task;
};