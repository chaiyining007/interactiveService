const egg = require('egg');
class UserService extends egg.Service {
    * create_family_invitation_code() {
        const { app, ctx } = this;
        let invitation_code = ctx.helper.create_family_invitation_code();
        let familys = yield app.model.Family.findAll({
            'where': {
                invitation_code: invitation_code
            }
        });
        if (familys.length) {
            return yield this.create_family_invitation_code();
        }
        return invitation_code;
    }
    * insert(data) {
        const { app, ctx } = this;
        const reg_data = Object.assign({}, data);
        const random_seed = 99999999999;
        let familys, family_id;
        if (reg_data.invitation_code) {
            familys = yield app.model.Family.findAll({
                'where': {
                    invitation_code: reg_data.invitation_code
                }
            });
            if (!familys.length) {
                return {
                    error: "邀请码错误！"
                }
            }
            reg_data.family_id = familys[0].getDataValue('id');
        } else {
            let family = yield app.model.Family.create({
                invitation_code: yield this.create_family_invitation_code()
            });
            reg_data.family_id = family.get({ 'plain': true }).id
        }

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

    * get({ login, password, authenticate_token }) {
        const { app, ctx } = this;
        const encrypted_password = ctx.helper.encryption_password(login, password);
        let [user] = yield app.model.User.findAll({
            'attributes': ['authenticate_token', 'mobile', 'email', 'avatar'],
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
                authenticate_token: user.getDataValue('authenticate_token'),
                mobile: user.getDataValue('mobile'),
                email: user.getDataValue('email'),
                avatar: user.getDataValue('avatar'),
            }
        } else {
            return {
                error: '账号或密码错误！'
            }
        }
    }
}
module.exports = UserService;