module.exports = app => {
    const { CHAR, TEXT, BIGINT } = app.Sequelize;

    const Family = app.model.define('family', {
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

    return Family;
};
