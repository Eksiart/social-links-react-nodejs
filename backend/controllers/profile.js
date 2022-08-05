const { User } = require('../models/index')
const jwt = require('../controllers/jwt')
const axios = require('axios');

const getOwner = async (req, res) => {
  const { userId, login = false } = req.query;
  let user
  console.log(login);
  if (login == 'true'){
    user = await User.findOne({ where: { login: userId } })
  }else{
    user = await User.findOne({ where: { id: userId } })
  }
  if (user) {
    let login = user.dataValues.login;
    let status = user.dataValues.status;
    let vk = null;
    let fb = null;
    let google = null;
    let twitter = null;
    if (user.dataValues.vk != -1){
      vk = await getVk(user.dataValues.vk);
    }
    if (user.dataValues.fb != -1){
      fb = await getFb(user.dataValues.fb);
    }
    if (user.dataValues.google != -1){
      google = await getGoogle(user.dataValues.googleRefresh);
    }
    if (user.dataValues.twitter != -1){
      twitter = await getVk(user.dataValues.twitter);
    }
    let answer = {
      login, status, vk, fb, google, twitter
    }
    res.status(200).json(answer)
  } else {
    res.status(400).json({ message: "Not found" })
  }
}

const getVk = async (vkId) => {
  let answer = null;
  const res = await axios.get('https://api.vk.com/method/users.get', {
    params: {
      user_id: vkId,
      access_token: '',
      fields: 'fields=photo_100,status,photo_200',
      v: 5.131
    }
  })
  .then(function (response) {
    const data = response.data.response[0]
    answer = {
      name: data.first_name + ' ' + data.last_name, 
      status: data.status, 
      photo : data.photo_200,
      link: `https://vk.com/id${data.id}`,
      provider: 'vk',
      providerUrl: 'vk',
      providerName: 'ВКонтакте',
      color: '#0077FF'
    }
  })
  .catch(function (error) {
    console.log(error);
  })

  return answer;
}

const getFb = async (fbId) => {
  let answer = null;
  const res = await axios.get(`https://graph.facebook.com/v13.0/${fbId}`, {
    params: {
      access_token: '',
      fields: 'link,id,name,picture.type(large)',
    }
  })
  .then(function (response) {
    const data = response.data
    answer = { 
      link: `https://www.facebook.com/${data.id}`, 
      name: data.name, 
      photo: data.picture.data.url, 
      status: 'Ваш статус...',
      provider: 'fb',
      providerUrl: 'facebook',
      providerName: 'Facebook',
      color: '#1877f2'
    }
  })
  .catch(function (error) {
    console.log(error);
  })

  return answer;
}

const getGoogle = async (googleRefresh) => {
  let answer = null;
  const accessToken = await axios.post(`https://www.googleapis.com/oauth2/v4/token`, {
    "client_id": "",
    "client_secret": "",
    "refresh_token": googleRefresh,
    "grant_type": "refresh_token"
  })
  .then(function (response) {
    return response.data.access_token;
  })
  .catch(function (error) {
    console.log(error);
    return null
  })
  if(accessToken){
    const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      params: {
        alt: "json",
        access_token: accessToken,
      }
    })
    .then(function (response) {
      const data = response.data
      answer = {
        name: data.name, 
        status: data.email, 
        photo: data.picture,
        provider: 'google',
        providerUrl: 'google',
        providerName: 'Google',
        color: '#EA4335'
      };
    })
    .catch(function (error) {
      console.log(error);
    })
    return answer;
  }else{
    return null
  }
}

const changeProfile = async (req, res) => {
  const { status, login, userId = '-1' } = req.query;
  if (typeof(status) === 'string' || typeof(login) === 'string'){
    let isLoginIsAlreadyUsed;
    if (login){
      if (login.search(/\D/) != -1) isLoginIsAlreadyUsed = true;
      else{
        isLoginIsAlreadyUsed = await User.findOne({ where: { login: login } })
        if (!isLoginIsAlreadyUsed){
          isLoginIsAlreadyUsed = await User.findOne({ where: { id: login } })
        }
      }
    }
    if (isLoginIsAlreadyUsed){
      res.status(400).json({ message: "login is already used" })
    }else{
      let userInDB = await User.findOne({ where: { id: userId } })
      if (userInDB){
        
        if(login){
          answer = await User.update({ login }, { where: { id: userId } })
        }
        if (status){
          answer = await User.update({ status }, { where: { id: userId } })
        }
        userInDB = await User.findOne({ where: { id: userId } })
        let vk = null;
        let fb = null;
        let google = null;
        let twitter = null;
        if (userInDB.dataValues.vk != -1){
          vk = await getVk(userInDB.dataValues.vk);
        }
        if (userInDB.dataValues.fb != -1){
          fb = await getFb(userInDB.dataValues.fb);
        }
        if (userInDB.dataValues.google != -1){
          google = await getGoogle(userInDB.dataValues.googleRefresh);
        }
        if (userInDB.dataValues.twitter != -1){
          twitter = await getVk(userInDB.dataValues.twitter);
        }
        const finalAnswer = {
          login, status, vk, fb, google, twitter
        }
        res.status(200).json(finalAnswer)
      }else{
        res.status(400).json({ message: "Not found" })
      }
    }
  }else{
    res.status(400).json({ message: "wrong field" })
  }
}

const deleteProvider = async (req, res) => {
  const { provider, userId } = req.query;
  const user = await User.findOne({ where: { id: userId } })
  let count = 0;
  if (user.dataValues.vk != -1) count++;
  if (user.dataValues.fb != -1) count++;
  if (user.dataValues.google != -1) count++;
  if (count >= 2){
    let answer = await User.update({ [provider]: -1 }, { where: { id: userId } })
    if (answer){
      res.status(200).json({ success: true })
    }else{
      res.status(500).json({ success: false, message: "something went wrong" })
    }
  }else{
    res.status(500).json({ success: false, message: "something went wrong" })
  }
}



module.exports = {
  getOwner,
  changeProfile,
  deleteProvider,
}