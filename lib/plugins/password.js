var crypto = require('crypto')
  , crypt = require('../crypt')

module.exports = exports = function (schema, options) {
  schema.pre('validate', function (next) {
    var field = options.field || 'password';

    if (typeof this[field] === 'undefined') {
      return next();
    }

    password = this[field];

    if (password === '') {
      return next();
    }

    if (!this.isModified(field)) {
      return next();
    }

    crypt.createPassword(password, this.cookieTokenSalt, this.passwordSalt, function(err, result){
	if (err) return next(err);
	this.password = result;
	return next()
    }.bind(this));
  });
};
