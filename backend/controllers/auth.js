const { User } = require('../models/index')

const jwt = require('./jwt')

const logIn = async (id, provider, googleRefresh = '') => {
  let result = await User.findOne({ where: { [provider]: id } })
  if (googleRefresh){
    if (result){
      User.update({ googleRefresh },{ where:{ [provider]: id } })
    }else{
      result = await User.create({ [provider]: id, googleRefresh })
      await User.update({ login: result.dataValues.id }, { where: { id: result.dataValues.id } })
      result.dataValues.login = result.dataValues.id
    }
  }else{
    if (!result){
      result = await User.create({[provider]: id})
      await User.update({ login: result.dataValues.id }, { where: { id: result.dataValues.id } })
      result.dataValues.login = result.dataValues.id
    }
  }
  let userId = result.dataValues.id;
  let login = result.dataValues.login;
  let vk = result.dataValues.vk;
  let fb = result.dataValues.fb;
  let twitter = result.dataValues.twitter;
  let google = result.dataValues.google;

  const accessToken = jwt.getAccessToken(userId, login, vk, fb, twitter, google);
  const refreshToken = jwt.getRefreshToken(userId, login, vk, fb, twitter, google);
  return [accessToken, refreshToken, userId];
}

const updateTokens = async (req, res) => {
  const { token } = req.body;
  if (token){
    const result = jwt.verify(token)
    if (result && result.type === 'success') {
      const loginResult = await logIn(result.value.userId, 'id');
      const accessToken = loginResult[0];
      const refreshToken = loginResult[1];
      res.cookie('accessToken', accessToken, { maxAge: 2592000000 });
      res.cookie('refreshToken', refreshToken, { maxAge: 2592000000 });
      res.status(200).json({ message: 'OK', accessToken, refreshToken })
    }else{
      res.status(402).json({ message: 'Bad Refresh Token' })
    }
  }else{
    res.status(401).json({ message: 'Unauthorized' })
  }
}

const bindProviders = async (providerId, provider, googleRefresh = '', refreshToken) => {
  const result = jwt.verify(refreshToken)
  if (result && result.type === 'success') {
    let userInDB = await User.findOne({ where: { id: result.value.userId } })
    if (userInDB){
      let isPrivderAlreadyInDB = await User.findOne({ where: { [provider]: providerId } })
      if (isPrivderAlreadyInDB){
        return null;
      }else{
        if (googleRefresh){
          await User.update({ [provider]: providerId, googleRefresh}, { where: { id: result.value.userId } })
          return true;
        }else{
          await User.update({ [provider]: providerId }, { where: { id: result.value.userId } })
          return true;
        }
      }
    }else{
      return null;
    }
  }else{
    return null;
  }
}

module.exports = {
  updateTokens,
  logIn,
  bindProviders
}