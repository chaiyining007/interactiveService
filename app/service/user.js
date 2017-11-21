const egg = require('egg');
const sha1 = require('node-sha1');
class UserService extends egg.Service {
    * insert(data) {
        const { app, ctx } = this;
        const reg_data = Object.assign({}, data);
        const random_seed = 999999999;
        reg_data.authenticate_token = sha1(`${parseInt(Math.random() * random_seed) + (+new Date())}`);
        reg_data.encrypted_password = sha1(`${reg_data.login}_and_${reg_data.password}`);
        let id = -1, error;
        let user = app.model.User.build(reg_data);
        try {
            user = yield user.validate();
            user = yield app.model.User.findOrCreate({
                where: {
                    login: reg_data.login
                },
                defaults: reg_data
            }).spread(function (user, created) {
                if (created) {
                    id = user.get({ 'plain': true }).id
                }
            });
        } catch (e) {
            error = e.errors[e.errors.length - 1].message;
        }
        finally {
            return { id: id, error: error };
        }
    }
}
module.exports = UserService;