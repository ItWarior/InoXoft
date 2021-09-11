module.exports = {
    PORT: process.env.PORT || 3000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft',

    ACCES_TOKEN: process.env.ACCES_TOKEN_SECRET || 'secret_public_tocen',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET || 'super_secret_refresh_token'
};
