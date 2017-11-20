module.exports = app => {
    const { CHAR, TEXT, BIGINT } = app.Sequelize;

    const Tasks = app.model.define('task', {
        title: CHAR(255),
        details: TEXT,
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

    return Tasks;
};