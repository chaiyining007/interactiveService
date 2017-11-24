module.exports = app => {
    const { CHAR, TEXT, BIGINT } = app.Sequelize;

    const User = app.model.define('user',
        {
            mobile: { type: CHAR(255), },
            email: { type: CHAR(255), },
            family_id: { type: CHAR(255), },
            avatar: { type: CHAR(255), },
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
                }
            },
            setterMethods: {
                password(value) {
                    this.setDataValue('password', value)
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
    return User;
};