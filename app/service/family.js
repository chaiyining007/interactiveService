const egg = require('egg');
class FamilyService extends egg.Service {
    * insert(data) {
        const { app, ctx } = this;
        const reg_data = Object.assign({}, data);
        let family = yield app.model.Family.create(data);
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
