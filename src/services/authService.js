var models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthService {
  async validate(username, pass) {
    var user = await models.User.findOne({
      where: {
        email: username,
      },
    });

    if (!user || !(await this.compareHash(pass, user.password))) {
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
    try {
      return bcrypt.hash(pass, saltRounds);
    } catch (error) {
      console.log(error);
    }
  }

  async compareHash(pass, hash) {
    return await bcrypt.compare(pass, hash);
  }

  async passGen(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

module.exports = new AuthService();
