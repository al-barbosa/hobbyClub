import React from 'react';
import './App.css';
import UserAPI from './helper/UserAPI';

function App() {
  const userApi = new UserAPI;

  const handleClick = async (e: any) => {
    e.preventDefault();
    const getAll = await userApi.getAll();
    console.log(getAll)
  }
  return (
    <div className="App">
      <button
        onClick={ handleClick }
      >
        Oi
      </button>
    </div>
  );
}

export default App;
