import './login.css'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import vkIcon from '../../img/socials/vk.svg';
import googleIcon from '../../img/socials/google.svg';
import twitterIcon from '../../img/socials/twitter.svg';
import fbIcon from '../../img/socials/facebook.svg';

const SignIn = (props) => {

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self")
  }

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self")
  }

  const vk = () => {
    window.open("http://localhost:5000/auth/vk", "_self")
  }

  return(
    <div className='bg'>
      <div className="overlay">
      </div>
      <div className='main'>
        <div>
        <Card sx={{ width: 275, marginLeft: 'auto', marginRight: 'auto'}}>
          <CardContent style={{backgroundColor: "white"}}>
            <Typography variant="h5" component="div">
              Авторизация
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              войти с помощью
            </Typography>
            <IconButton aria-label="delete" onClick={vk}>
                <Avatar src={vkIcon}/>
            </IconButton>
            <IconButton aria-label="delete">
              <Avatar src={twitterIcon}/>
            </IconButton>
            <IconButton aria-label="delete" onClick={facebook}>
                <Avatar src={fbIcon}/>
            </IconButton>
            <IconButton aria-label="delete" onClick={google}>
              <Avatar src={googleIcon}/>
            </IconButton>
          </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignIn;