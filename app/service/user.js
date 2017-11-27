const egg = require('egg');
class UserService extends egg.Service {
    /**
     * 注册
     * @param { Object } data 注册信息
     */
    * insert(data) {
        const { app, ctx } = this;
        const reg_data = Object.assign({}, data);
        let familys, family_id;
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

    /**
     * 获取用户信息
     * @param {Object} param 账号 AND 密码 OR token
     */
    * get({ login, password, authenticate_token }) {
        const { app, ctx } = this;
        const encrypted_password = ctx.helper.encryption_password(login, password);
        let [user] = yield app.model.User.findAll({
            'attributes': ['id','authenticate_token', 'mobile', 'email', 'avatar', 'family_id'],
            'where': {
                '$or': [{
                    'login': login,
                    'encrypted_password': encrypted_password,
                }, {
                    'authenticate_token': authenticate_token
                }]
            }
        });
        if (user) {
            return {
                id: user.getDataValue('id'),
                authenticate_token: user.getDataValue('authenticate_token'),
                mobile: user.getDataValue('mobile'),
                email: user.getDataValue('email'),
                avatar: user.getDataValue('avatar'),
                family_id: user.getDataValue('family_id'),
            }
        } else {
            return {
                error: '账号或密码错误！'
            }
        }
    }
}
module.exports = UserService;