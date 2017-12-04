const path = require('path');
const BaseService = require(`${path.resolve('./app/base/BaseService.js')}`);
class FamilyService extends BaseService {
    * insert({invitation_code}) {
        const { app, ctx } = this;     
        let family = yield app.model.Family.create({
            invitation_code: invitation_code
        });
        return family.get({ 'plain': true });
    }

    * update(data) {
        const { app, ctx } = this;
        const reg_data = Object.assign({}, data);
        let family = app.model.Family.build(data);
        family = yield family.update();
        return family.get({ 'plain': true });
    }

    * delete(data) {
        const { app, ctx } = this;
        let family = yield app.model.Family.build(data);
        family = yield family.destroy();
        return {};
    }
}
module.exports = FamilyService;
