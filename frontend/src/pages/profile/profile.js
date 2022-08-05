import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../../components/header/header';
import ProviderCard from '../../components/provider-card/provider-card';
import NoDataCard from '../../components/provider-card/no-data-card';
import ProfileChange from '../../components/profile-change/profile-change';
import ProfileInfo from '../../components/profile-info/profile-info';

import './profile.css'

import { logout, updateTokens } from '../../functions/basic'

import { useEffect, useState  } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const Profile = ({myPage}) => {
  const [user, setUser] = useState(null);

  const route = useParams()
  const navigate = useNavigate();

  let id = myPage ? myPage : route.id
  let isOwner = !route.id

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
    axios.get(apiUrl, { params: { userId: id, login: !isOwner }}).then((resp) => {
      const profile = resp.data;
      setUser(profile);
      console.log(profile);
    }).catch(async (err) => {
      console.log(err);
      if(err.response.status === 400) navigate("/notfound");
      if(err.response.status == 402){
        let refreshToken = cookies.get('refreshToken')
        let result = await updateTokens(refreshToken)
        if (result) {
          console.log('Retry');
          getUser()
        }
      }
      if(err.response.status == 401){
        logout()
      }
    })
  };

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
              {isOwner ?  (<ProfileChange getUser={getUser}/>) : (<div></div>)}
              <div className='socialLinks'>
                {user && user.vk 
                  ? <ProviderCard providerData={user.vk} showLink={true} isOwner={isOwner}/>
                  : <NoDataCard providerData={providers.vk} userData={user} isOwner={isOwner}/>
                }
                {user && user.google 
                  ? <ProviderCard providerData={user.google} isOwner={isOwner}/>
                  : <NoDataCard providerData={providers.google} userData={user} isOwner={isOwner}/>
                }
                {user && user.fb 
                  ? <ProviderCard providerData={user.fb} showLink={true} isOwner={isOwner}/>
                  : <NoDataCard providerData={providers.fb} userData={user} isOwner={isOwner}/>
                }
                <div className='zagl'></div>
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