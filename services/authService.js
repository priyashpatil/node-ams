var models = require('../models');

class AuthService {
  async validate(username, pass) {
    var user = await models.User.findOne({
      where: {
        email: username,
      },
    });

    if (!user || user.password !== pass) {
      return false;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  }

  async hashPassword(pass) {
    //
  }

  async validatePassword(pass, hash) {
    //
  }
}

module.exports = new AuthService();
