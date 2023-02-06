import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Club from './pages/club';
import Login from './pages/login';
import Profile from './pages/profile';

function App() {
  return (
      <div>
          <Router>
            <Routes>
              <Route path="/" element={ <Login/> } />
              <Route path="/profile/:id" element={ <Profile/> } />
              <Route path="/club/:id" element={ <Club/> } />
            </Routes>
          </Router>
      </div>
  );
}

export default App;
