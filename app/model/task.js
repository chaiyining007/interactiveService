module.exports = app => {

    const { INTEGER, CHAR, TEXT, DATE } = app.Sequelize;
    const Task = app.model.define('task', {
        // id: { type: INTEGER, primaryKey: true },
        title: CHAR(255),
        details: TEXT,
        imgs: TEXT,
        // created_at: { type: DATE, allowNull: false, },
        // updated_at: { type: DATE, allowNull: false, },
    });

    return Task;
};