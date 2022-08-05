import Skeleton from '@mui/material/Skeleton';

const ProfileInfo = ({user}) => {

  return (
    <div className='profileInfo'>

      {user && user.login ? (
        <h1>{user.login}</h1>
      ) : (
        <div>
          <Skeleton animation="wave" width={250} height={56} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </div>
      )}
      {user && user.status ? (
        <p style={{ marginTop: -20, marginBottom: 20 }}>{user.status}</p>
      ) : (
        <div>
          <Skeleton animation="wave" width={250} height={20} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <Skeleton animation="wave" width={100} height={20} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
          <div style={{height:'10px'}}></div>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;