import axios from 'axios'

import Cookies from 'universal-cookie';

export const updateTokens = async (refreshToken) => {
  const apiUrl = 'http://localhost:5000/auth/updatetokens';
  return await axios.post(apiUrl, {token: refreshToken, asa: 'aaa'} ).then((resp) => {
    const cookies = new Cookies();
    cookies.set('refreshToken', resp.data.refreshToken, { path: '/'});
    cookies.set('accessToken', resp.data.accessToken, { path: '/'});
    console.log('tokens has been refreshed');
    return true
  }).catch((err) => {
    logout();
    return false
  });
}

export const logout = async () => {
  const cookies = new Cookies();
  cookies.remove('accessToken');
  cookies.remove('refreshToken');
  cookies.remove('userId');
  window.open("http://localhost:5000/auth/logout", "_self")
}