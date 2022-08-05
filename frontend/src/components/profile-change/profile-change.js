import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import Cookies from 'universal-cookie';
import axios from 'axios'
import { useState  } from 'react';

import { logout, updateTokens } from '../../functions/basic'

const cookies = new Cookies();

const ProfileChange = ({getUser}) => {
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setLoginValue('') 
    setStausValue('')
    setOpen(false);
  }

  const [loginValue, setLoginValue] = useState('');
  const _handleLoginChange = (e) => {
    setLoginValue(e.target.value)
    if ((e.target.value.length > 0 && !e.target.value.match(/^[a-z0-9]+$/i)) || e.target.value.search(/\D/) == -1 || e.target.value.length > 15 || e.target.value.length < 1 || e.target.value == 'profile' || e.target.value == 'login' || e.target.value == 'notfound'){
      setLoginError(true)
    }else{
      setLoginError(false)
    }
  }

  const [statusValue, setStausValue] = useState('');
  const _handleStatusChange = (e) => {
    setStausValue(e.target.value)
  }

  const changeProfile = async () => {
    let apiUrl = `http://localhost:5000/profile/change`;
    let params = {}
    if (statusValue) params.status = statusValue;
    if (loginValue) params.login = loginValue;
    await axios.get(apiUrl, { params, headers: {"Authorization" : `Bearer ${cookies.get('accessToken')}` }}).then((resp) => {
      handleClose()
      getUser();
    }).catch( async (err) => {
      console.log(err.response);
      if(err.response.status == 402){
        let refreshToken = cookies.get('refreshToken')
        let result = await updateTokens(refreshToken)
        if (result) {
          console.log('Retry');
          changeProfile()
        }
      }
      if(err.response.status == 401){
        logout()
      }
      if(err.response.status == 422){
        err.response.data.errors.forEach(element => {
          if (element.param == 'login') setLoginError(true)
        });
      }
    });
  }


  return (
    <div>
      <Fab style={{ background: '#42a5f5' }} onClick={handleOpen} aria-label="add">
        <EditIcon  sx={{ color: 'white' }}/>
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login:
          </Typography>
          <TextField error={loginError} id="standard-basic" value={loginValue} onChange={_handleLoginChange} label="login" variant="standard" />
          <Typography id="modal-modal-description" variant="h6" component="h2" sx={{ mt: 2 }}>
            Status:
          </Typography>
          <TextField fullWidth  id="standard-basic" inputProps={{ maxLength: 200 }} value={statusValue} onChange={_handleStatusChange} label="status" variant="standard" />
          <Button disabled={loginError} sx={{marginTop: 3}} onClick={changeProfile}  variant="contained">Save</Button>
        </Box>
      </Modal>
      <div style={{height: 20}}></div>
    </div>
  );
}

export default ProfileChange;