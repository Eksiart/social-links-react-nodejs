import { Component } from 'react';
import Cookies from 'universal-cookie';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import NoPage from './pages/no-page/no-page';

import './App.css';

const cookies = new Cookies();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: cookies.get('accessToken'),
      userId: cookies.get('userId')
    };
  }

  render(){
    const accessToken = this.state.accessToken;
    const userId = this.state.userId;

    return (
      <div className="App" style={{minWidth: "350px"}}>
        <BrowserRouter>
          <div>
            <Routes>
              <Route 
                path="/" 
                element={accessToken ? <Navigate to="/profile"/> : <Navigate to="/login"/>}
              />
              <Route 
                path="/login" 
                element={accessToken ? <Navigate to="/profile"/> : <Login/>}
              />
              <Route 
                path="/profile" 
                element={accessToken ? <Profile myPage={userId}/> : <Navigate to="/login"/>}
              />
              <Route 
                path="/profile/:id" 
                element={<Profile/>}
              />
              <Route 
                path="/notfound"
                element={<NoPage/>}
              />
              <Route 
                path="*"
                element={<Navigate to="/notfound"/>}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
