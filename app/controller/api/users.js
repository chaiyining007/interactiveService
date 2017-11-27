const path = require('path');
const BaseController = require(`${path.resolve('./app/base/BaseController.js')}`);

class UserController extends BaseController {
    /**
     * 创建家庭邀请码
     */
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
    /**
     * 注册
     * type:"post",
     * query:{
     *  login:'账号',
     *  password:'密码',
     *  invitation_code:'邀请码',
     *  is_random:'是否随机产生，账号，密码空的时候生效'
     * }
     */
    * create() {
        const { app, ctx, service } = this;
        const reg_data = ctx.request.body;
        const random_seed = 99999999999;
        let familys, family_id;
        if (reg_data.invitation_code) {
            familys = yield app.model.Family.findAll({
                'where': {
                    invitation_code: reg_data.invitation_code
                }
            });
            if (!familys.length) {
                this.error("邀请码错误！")
                return;
            }
            reg_data.family_id = familys[0].getDataValue('id');
        } else {
            let family = yield app.model.Family.create({
                invitation_code: yield this.create_family_invitation_code()
            });
            reg_data.family_id = family.get({ 'plain': true }).id
        }

        if (reg_data.is_random) {
            reg_data.login = reg_data.login || `random_${parseInt(Math.random() * random_seed) + (+new Date())}`;
            reg_data.password = reg_data.password || `random_password_${parseInt(Math.random() * random_seed) + (+new Date())}`;
        }
        const data = yield service.user.insert(reg_data);
        if (data.id && data.id > 0) {
            this.success(data)
        } else {
            this.error(data.error || '账号已存在');
        }
    }

    * login() {
        const { ctx, service } = this;
        const data = yield service.user.get(ctx.request.body);

        if (data.authenticate_token) {
            ctx.session[data.authenticate_token] = data;
            this.success({ authenticate_token: data.authenticate_token })
        } else {
            this.error(data.error);
        }
    }
}
module.exports = UserController;