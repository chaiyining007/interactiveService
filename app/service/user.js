const egg = require('egg');
class UserService extends egg.Service {
    * insert(data) {
        const { app, ctx } = this;
        const reg_data = Object.assign({}, data);
        const random_seed = 99999999999;
        if (reg_data.is_random) {
            reg_data.login = `random_${parseInt(Math.random() * random_seed) + (+new Date())}`;
            reg_data.password = `random_password_${parseInt(Math.random() * random_seed) + (+new Date())}`;
        }
        reg_data.authenticate_token = ctx.helper.create_authenticate_token();
        reg_data.encrypted_password = ctx.helper.encryption_password(reg_data.login, reg_data.password);
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
            return {
                id: id,
                authenticate_token: reg_data.authenticate_token,
                login: reg_data.login,
                password: reg_data.password,
                error: error
            };
        }
    }

    * get({ login, password }) {
        const { app, ctx } = this;
        const encrypted_password = ctx.helper.encryption_password(login, password);
        let [user] = yield app.model.User.findAll({
            'attributes': ['authenticate_token'],
            'where': {
                'login': login,
                'encrypted_password': encrypted_password,
            }
        });
        if (user) {
            return {
                authenticate_token: user.getDataValue('authenticate_token')
            }
        } else {
            return {
                error: '账号或密码错误！'
            }
        }
    }
}
module.exports = UserService;