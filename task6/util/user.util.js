const user_normalizator = (user_to_normalize) => {
    const property_to_remove = [
        'password',
        '__v'
    ];
    const user = user_to_normalize.toJSON();

    property_to_remove.forEach((property) => {
        delete user[property];
    });

    return user;
};

module.exports = {

    user_normalizator
};
