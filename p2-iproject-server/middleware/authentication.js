const {verifyToken} = require('../helper/jwt')
const {User} = require('../models')

function authentication(req, _res, next) {
  try {
    let {token} = req.headers
    let decoded = verifyToken(token)

    User.findOne({where: {email: decoded.email}})
      .then((foundUser) => {
        if (foundUser) {
          req.loggedUser = decoded
          next()
        } else {
          next({status: 401, message: 'invalid JWT'})
        }
      })
      .catch(next)
  } catch (err) {
    next({status: 403, message: 'you must be logged in'})
  }
}

module.exports = authentication
