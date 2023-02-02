import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Profile from './pages/profile';

function App() {
  return (
      <div>
          <Router>
            <Routes>
              <Route path="/" element={ <Login/> } />
              <Route path="/profile/:id" element={ <Profile/> } />
              {/* <Route path="/profile" element={ <Profile/> } /> */}
            </Routes>
          </Router>
      </div>
  );
}

export default App;
