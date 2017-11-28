const Controller = require('egg').Controller;
class BaseController extends Controller {
    get pageIndex() {
        return (this.ctx.query.page - 0) || 1;
    }
    get perPage() {
        return (this.ctx.query.per_page - 0) || 20;
    }
    get offset() {
        return (this.pageIndex - 1) * this.perPage;
    }
    get paginationData() {
        return {
            page_index: this.pageIndex,
            per_page: this.perPage,
            offset: this.offset,
        }
    }
    * getUserData() {
        const { ctx, service } = this;
        const { headers } = ctx;
        const token = headers['x-auth-token'];
        const data = yield service.user.get({ authenticate_token: token });
        return data;
    }
    success(data) {
        this.ctx.body = {
            success: true,
            data,
        };
    }
    warn(msg, data) {
        this.ctx.body = {
            warn: msg,
            data,
        };
    }
    error(msg) {
        this.ctx.body = {
            error: msg
        };
    }
}
module.exports = BaseController;