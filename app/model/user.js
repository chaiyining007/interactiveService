module.exports = app => {
    const { CHAR, TEXT, BIGINT } = app.Sequelize;
    const User = app.model.define('user',
        {
            mobile: { type: CHAR(255), },
            email: { type: CHAR(255), },
            family_id: { type: CHAR(255), },
            avatar: { type: CHAR(255), },
            name: { type: CHAR(255), },
            encrypted_password: { type: CHAR(255), },
            login: {
                type: CHAR(255),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "账号不能为空！" }
                }
            },
            authenticate_token: { type: CHAR(255), },
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
                password() {
                    return this.getDataValue('password');
                },
                avatar() {
                    return this.getDataValue('avatar') || 'http://kalemao.yunwanse.com/kalemao_f2e/main/view/phone/user_center/img/us_default_photo2x.png';
                },
                task_count() {
                    return this.getDataValue('task_count') || 0
                }
            },
            setterMethods: {
                password(value) {
                    this.setDataValue('password', value)
                },
                task_count(value) {
                    this.setDataValue('task_count', value)
                }
            },
            validate: {
                password() {
                    if (!this.getDataValue('password')) {
                        throw new Error('密码不能为空！')
                    }
                }
            }
        });
    User.associate = function () {
        const Task = app.model.models.task;
        const TaskRun = app.model.models.task_run;
        User.hasMany(Task, { foreignKey: "create_user", as: "tasks" });
        User.hasMany(TaskRun, { foreignKey: "user_id",as :"run_user"  });
    }
    return User;
};