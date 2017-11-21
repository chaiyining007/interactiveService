const sha1 = require('node-sha1');
module.exports = {
    encryption_password: function (login, password) {
        return sha1(`${login}_and_${password}`);
    },
    create_authenticate_token: function () {
        const random_seed = 99999999999;
        return sha1(`${parseInt(Math.random() * random_seed) + (+new Date())}`);
    }
};
