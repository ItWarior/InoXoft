const { EMAIL_ACTIONS_ENAM } = require('../configs');

module.exports = {
    [EMAIL_ACTIONS_ENAM.WELCOM]: {
        templeate_name: 'welcome',
        subject: 'Welcome on board'
    },
    [EMAIL_ACTIONS_ENAM.GOODBYE]: {
        templeate_name: 'goodbye',
        subject: 'Have a nice day'
    },
    [EMAIL_ACTIONS_ENAM.REGISTRATION]: {
        templeate_name: 'registration',
        subject: 'For registration'
    },
    [EMAIL_ACTIONS_ENAM.FORGOT_PASSWORD]: {
        templeate_name: 'forgot_pasword',
        subject: 'For actiwation new password'
    },
    [EMAIL_ACTIONS_ENAM.DELETED_ACOUNT]: {
        templeate_name: 'deleteAcount',
        subject: 'For information'
    },
    [EMAIL_ACTIONS_ENAM.FOR_NEW_ADMIN]: {
        templeate_name: 'forNewAdmin',
        subject: 'For information'
    }

};
