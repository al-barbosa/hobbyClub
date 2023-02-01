import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import UserAPI from './helper/UserAPI';
import Login from './pages/LoginPage';

function App() {
  const userApi = new UserAPI();

  const handleClick = async (e: any) => {
    e.preventDefault();
    const getAll = await userApi.getAll();
    console.log(getAll)
  }
  return (
      <div>
          <Router>
            <Routes>
              <Route path="/" element={ <Login/> } />
              {/* <Route path="/profile" element={ <Profile/> } /> */}
              {/* <Route path="/profile" element={ <Profile/> } /> */}
            </Routes>
          </Router>
      </div>
  );
}

export default App;
