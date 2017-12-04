module.exports = app => {
    const { INTEGER, BIGINT } = app.Sequelize;

    const TaskRun = app.model.define('task_run', {
        task_id: {
            type: INTEGER,
            allowNull: false,
        },
        user_id: {
            type: INTEGER,
            allowNull: false,
        },
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

    TaskRun.associate = function () {
        const User = app.model.models.user;
        TaskRun.belongsTo(User, { foreignKey: "user_id",as:'run_user' });
    };
    return TaskRun;
};
