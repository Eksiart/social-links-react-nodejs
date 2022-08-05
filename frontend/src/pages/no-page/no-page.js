
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Header from '../../components/header/header';

const NoPage = (props) => {

  return(
    <div>
      <Header/>
      <div className='bg'>
        <div className="overlay">
        </div>
        <div className='main'>
          <div>
          <Card sx={{ width: 275, marginLeft: 'auto', marginRight: 'auto'}}>
            <CardContent style={{backgroundColor: "white"}}>
              <h1>Страница не найдена</h1>
            </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoPage;