import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios'
import { logout, updateTokens } from '../../functions/basic'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ProviderCard = ({ providerData, showLink, isOwner }) => {

  const toUserProfile = () => {
    window.open(providerData.link, "_blank")
  }
  
  const toProvider = () => {
    window.open(`https://${providerData.provider}.com/`, "_blank")
  }
  
  const deleteProvider = async () => {
    let apiUrl = `http://localhost:5000/profile/change/delete-provider`;
    let params = { provider: providerData.provider }
    await axios.get(apiUrl, { params, headers: {"Authorization" : `Bearer ${cookies.get('accessToken')}` }}).then((resp) => {
      window.location.reload();
    }).catch( async (err) => {
      console.log(err);
      if(err.response.status == 402){
        let refreshToken = cookies.get('refreshToken')
        let result = await updateTokens(refreshToken)
        if (result) {
          console.log('Retry');
          deleteProvider()
        }
      }
      if(err.response.status == 401){
        logout()
      }
    });
  }

  return (
    <Card elevation={0} sx={{ width: 350, marginLeft: 'auto', marginRight: 'auto', marginBottom: "10px" }}>
      <CardContent style={{backgroundColor: providerData.color, color: 'white'}}>
        <Grid sx={{position: "relative"}} container spacing={1}>
          <Grid item xs={6}>
            <Typography onClick={toProvider} align="left" sx={{ fontSize: 14 }} gutterBottom>
              {providerData.providerName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {isOwner
              ? <IconButton onClick={deleteProvider}  sx={{top: 0, right: -5, position: "absolute"}} size="small" aria-label="delete">
                  <CloseIcon fontSize="inherit"/>
                </IconButton>
              : <div></div>
            }
          </Grid>
        </Grid>
        <Grid container spacing={0.5}>
          <Grid item xs={3}>
            <Avatar alt="avatar" src={providerData.photo} sx={{ width: 56, height: 56 }}/>
          </Grid>
          <Grid item xs={8}>
            <div>
              <Typography align="left" variant="h5" component="div">
                {providerData.name}
              </Typography>
              <Typography sx={{ color: 'white', mb: 1.5 }} align="left">
                {providerData.status}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </CardContent>
      { showLink ? (
          <CardActions>
            <Button size="small" onClick={toUserProfile}>Перейти на страницу</Button>
          </CardActions>
        ) : (
          <div></div>
        )
      }
    </Card>
  );
}

export default ProviderCard;