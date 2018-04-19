const userFacade = require('../model/user/facade')

module.exports.admin = async function (email, password) {
  try {
    let user = await userFacade.findOne({email: email})
    if (!user) {
      await userFacade.create({email: email, password: password, role: 'ADMIN'})
    }
  } catch (e) {
    console.error('seedDb, admin: ', e)
  }
}
