const path = require('path');
const BaseService = require(`${path.resolve('./app/base/BaseService.js')}`);
class UserService extends BaseService {
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
            if (error) {
                return this.error(error);
            }
            return this.success({
                id: id,
                authenticate_token: reg_data.authenticate_token,
                login: reg_data.login,
                password: reg_data.password,
            });
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
            'attributes': ['id', 'name', 'authenticate_token', 'mobile', 'email', 'avatar', 'family_id'],
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
            return this.success({
                id: user.getDataValue('id'),
                name: user.getDataValue('name'),
                authenticate_token: user.getDataValue('authenticate_token'),
                mobile: user.getDataValue('mobile'),
                email: user.getDataValue('email'),
                avatar: user.getDataValue('avatar'),
                family_id: user.getDataValue('family_id'),
            });
        } else {
            return this.error('账号或密码错误！');
        }
    }
}
module.exports = UserService;