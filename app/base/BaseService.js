const Service = require('egg').Service;
class BaseService extends Service {
    success(data) {
        return {
            success: true,
            data,
        };
    }
    warn(msg, data) {
        return {
            warn: msg,
            data,
        };
    }
    error(msg) {
        return {
            error: msg
        };
    }
}
module.exports = BaseService;