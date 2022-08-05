import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { logout } from '../../functions/basic'

const Header = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="fixed" style={{ background: '#42a5f5' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Social Links
          </Typography>
          <Button color="inherit" style={{ marginLeft: "auto" }} onClick={logout}>Выход</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;