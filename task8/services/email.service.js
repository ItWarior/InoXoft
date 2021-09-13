const Email_Templates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const templates_info = require('../email-templates');

const { CONFIG } = require('../configs');
const OwnError = require('../errors/errorHendler');

const template_parser = new Email_Templates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: CONFIG.EMAIL_FOR_SENDING,
        pass: CONFIG.EMAIL_FOR_SENDING_PASS
    }
});

const send_mail = async (user_mail, email_action, context = {}) => {
    const templates_obj = templates_info[email_action];

    // eslint-disable-next-line no-param-reassign
    context = { ...context, frontend_url: CONFIG.FRONTEND_URL };

    if (!templates_obj) {
        throw new OwnError(500, 'Wrong template name');
    }

    const { templeate_name, subject } = templates_obj;

    const html = await template_parser.render(templeate_name, context);

    return transporter.sendMail({
        from: 'No reply',
        to: user_mail,
        subject,
        html
    });
};

module.exports = {
    send_mail
};
