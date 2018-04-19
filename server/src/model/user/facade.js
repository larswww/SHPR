'use strict'

const Facade = require('../../lib/facade');
const userSchema = require('./schema');

class UserFacade extends Facade {

  findOneLogin(...args) {
    return new Promise((resolve, reject) => {
      this.Schema.findOne(...args).then(doc => {
        if (!doc || doc === undefined || doc.errors !== undefined) return reject({ message: 'No such user found', statusCode: 404 });
        return resolve(doc);
      }).catch(e => {
        return reject({message: "Find one user failed.", statusCode: 500});
      })

    });
  }

  async createUser(newUserObject) {
      return await this.Schema.create(newUserObject)
  }

}

module.exports = new UserFacade(userSchema);
