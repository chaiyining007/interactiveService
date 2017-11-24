const sha1 = require('node-sha1');
module.exports = {
    encryption_password: function (login, password) {
        return sha1(`${login}_and_${password}`);
    },
    create_authenticate_token: function () {
        const random_seed = 99999999999;
        return sha1(`${parseInt(Math.random() * random_seed) + (+new Date())}`);
    },
    create_family_invitation_code: function () {
        const base = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let length = 6;
        const invitation_code = [];
        while (length--) {
            invitation_code.push(base[parseInt(Math.random() * (base.length - 1))]);
        }
        return invitation_code.join('');
    }
};
