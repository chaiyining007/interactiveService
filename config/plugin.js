'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}
exports.validate = {
    enable: true,
    package: 'egg-validate',
};
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
exports.security = {
    enable: false,
};
// exports.redis = {
//     enable: true,
//     package: 'egg-redis',
// };
// exports.sessionRedis = {
//     enable: true,
//     package: 'egg-session-redis',
// };
