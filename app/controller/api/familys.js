const path = require('path');
const BaseController = require(`${path.resolve('./app/base/BaseController.js')}`);
/**
 * 类：
 * 说明：
 * 创建人：
 */
class FamilyController extends BaseController {

    /**
     * 方法：创建
     * 说明：
     * 创建人：
     */
    * create() {
        const { ctx, service } = this;
        const data = yield service.family.insert(ctx.request.body);
        ctx.body = { biz_action: 0, data: data };
    }

    /**
     * 方法：获取
     * 说明：
     * 创建人：
     */
    * show() {

    }

    /**
     * 方法：更新
     * 说明：
     * 创建人：
     */
    * update() {

    }
    
    /**
     * 方法：删除
     * 说明：
     * 创建人：
     */
    * destroy() {

    }
}
module.exports = FamilyController;
