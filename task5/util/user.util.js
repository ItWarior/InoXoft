const user_normalizator = (user_to_normalize) => {

   const property_to_remove = ['password', '__v'];

   user_to_normalize = user_to_normalize.toJSON();

   property_to_remove.forEach((property) => {
      delete user_to_normalize[property];

   });

   return user_to_normalize;

}

module.exports = {

   user_normalizator
}