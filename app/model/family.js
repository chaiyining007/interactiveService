module.exports = app => {
    const { CHAR, TEXT, BIGINT } = app.Sequelize;

    const Family = app.model.define('family', {
        name: { type: CHAR(255), },
        avatar: { type: CHAR(255),},
        invitation_code: { type: CHAR(255),},
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
