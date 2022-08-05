import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NoDataCard = ({ providerData, userData, isOwner }) => {
  const bind = () => {
    window.open(`http://localhost:5000/auth/${providerData.bindLink}?bind=${cookies.get('refreshToken')}`, "_self")
  }

  return (
    <div>
      <Card elevation={0} sx={{ width: 350, marginLeft: 'auto', marginRight: 'auto', marginBottom: "10px" }}>
        <CardContent style={{backgroundColor: providerData.color, color: 'white'}}>
          <Typography align="left" sx={{ fontSize: 14 }} gutterBottom>
            {providerData.providerName}
          </Typography>
          <Grid container spacing={0.5}>
            <Grid item xs={3}>
              <Skeleton animation="wave" variant="circular" width={56} height={56} />
            </Grid>
            <Grid item xs={8}>
              <div>
                <Skeleton animation="wave" width={200} height={40} style={{marginTop: -8}}/>
                <Skeleton animation="wave" width={120} height={30} style={{marginTop: -5}}/>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        {isOwner 
        ? <CardActions>
            <Button disabled={!userData} size="small" onClick={bind}>Привязать</Button>
          </CardActions>
        : <div></div>
        }
      </Card>
      <div style={{ height: '20px' }}></div>
    </div>
  );
}

export default NoDataCard;