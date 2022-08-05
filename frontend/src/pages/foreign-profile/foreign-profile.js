import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../../components/header/header';
import ProviderCard from '../../components/provider-card/provider-card';
import NoDataCard from '../../components/provider-card/no-data-card';
import ProfileChange from '../../components/profile-change/profile-change';
import ProfileInfo from '../../components/profile-info/profile-info';

import './profile.css'

import { useEffect, useState  } from 'react';
import axios, { AxiosError } from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const Profile = () => {

  const [user, setUser] = useState(null);

  const providers = {
    vk: { 
      bindLink: 'vk', 
      providerName: 'ВКонтакте', 
      color: '#0077FF' 
    },
    fb: { 
      bindLink: 'facebook', 
      providerName: 'Facebook', 
      color: '#1877f2' 
    },
    google: { 
      bindLink: 'google', 
      providerName: 'Google', 
      color: '#EA4335' 
    },
  }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const apiUrl = 'http://localhost:5000/profile';
    axios.get(apiUrl, { headers: {"Authorization" : `Bearer ${cookies.get('accessToken')}` }}).then((resp) => {
      const profile = resp.data;
      setUser(profile);
      console.log(profile);
    }).catch((err) => {
      if(err.response.status === 402) updateTokens();
    })
  };

  const updateTokens = async () => {
    const apiUrl = 'http://localhost:5000/auth/updatetokens';
    await axios.get(apiUrl, { headers: {"Authorization" : `Bearer ${cookies.get('refreshToken')}` }}).then((resp) => {
      cookies.set('refreshToken', resp.data.refreshToken, { path: '/' });
      cookies.set('accessToken', resp.data.accessToken, { path: '/' });
      getUser();
    }).catch((err) => {
      console.log(err);
    });
  }

  return(
    <div>
      <Header/>
      <div className="profile">
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(190,190,190, 0.5)',
            zIndex: 10,
            position: "absolute"
          }}
        />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: 'rgba(255,255,255, 0.9)', height: '100%' }}>
            <div className="content">
              <div className='zagl'></div>
              <ProfileInfo user={user}/>
              <ProfileChange getUser={getUser}/>
              <div className='socialLinks'>
                {user && user.vk 
                  ? <ProviderCard providerData={user.vk} showLink={true}/>
                  : <NoDataCard providerData={providers.vk}/>
                }
                {user && user.google 
                  ? <ProviderCard providerData={user.google}/>
                  : <NoDataCard providerData={providers.google}/>
                }
                {user && user.fb 
                  ? <ProviderCard providerData={user.fb} showLink={true}/>
                  : <NoDataCard providerData={providers.fb}/>
                }
                <div className='zagl'></div>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default Profile;