module.exports = app => {
    const { CHAR, TEXT, BIGINT } = app.Sequelize;

    const User = app.model.define('user', {
        mobile: { type: CHAR(255), },
        email: { type: CHAR(255), },
        avatar: { type: CHAR(255), },
        encrypted_password: { type: CHAR(255), },
        login: { type: CHAR(255), },
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
    });

    return User;
};