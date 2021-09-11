const jwt = require('jsonwebtoken');

const { CONFIG } = require('../configs');
const OwnError = require('../errors/errorHendler');

module.exports = {

    generete_token_pair: () => {
        const access_token = jwt.sign({}, CONFIG.ACCES_TOKEN, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, CONFIG.REFRESH_TOKEN, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },
    verify_tokens: (token, token_type = 'access_token') => {
        try {
            const secret_word = token_type === 'access_token' ? CONFIG.ACCES_TOKEN : CONFIG.REFRESH_TOKEN;

            jwt.verify(token, secret_word);
        } catch (e) {
            throw new OwnError(401, 'Invalid token');
        }
    }

};
