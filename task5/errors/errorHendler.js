class OwnError extends Error {

   constructor(status, message) {

      super(message);
      this.status = status;

      Error.captureStackTrace(this, this.constructor);
   }
   pretty() {
      console.log(`

         error title : ${this.message}
         code : ${this.status}

         `)
   }
}

module.exports = OwnError;