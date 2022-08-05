const jwt = require('jsonwebtoken')

const create = (payload = {}, expiresIn) => {
  return jwt.sign(payload, 'PraktikaProjectISU', {
    expiresIn
  })
}

module.exports.getAccessToken = (userId, login, vk, fb, twitter, google) => {
  return create({ userId, login, vk, fb, twitter, google }, 3600)
}

module.exports.getRefreshToken = (userId, login, vk, fb, twitter, google) => {
  return create({ userId, login, vk, fb, twitter, google }, 3600 * 24)
}

module.exports.verify = (token = '') => {
  return jwt.verify(token, 'PraktikaProjectISU', (err, decodedToken) => {
    if (decodedToken) {
      return {
        type: 'success',
        value: decodedToken
      }
    } else {
      return {
        type: 'error',
        value: err
      }
    }
  })
}