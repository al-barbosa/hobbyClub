import '../styles/Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../helper/UserAPI';

export default function Login() {
  const userApi = new UserAPI();
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');


  const handleLoginInfo = ({ target }: { target:{ name: string, value: string } }) => {
    const { name, value } = target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    const userInfo = await userApi.login(loginInfo.email, loginInfo.password);
    if (userInfo.message) {
      setErrorMessage(userInfo.message)
    };
    if (userInfo.token) {
      setErrorMessage('');
      console.log(userInfo)
      // navigate('/profile');
    }
  };

  return (
    <div id="loginPage">
      <form className="loginForm">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={ loginInfo.email }
          onChange={ handleLoginInfo }
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={ loginInfo.password }
          onChange={ handleLoginInfo }
        ></input>
        { errorMessage &&
        <span>{errorMessage}</span> }
        <div className="buttonsDiv">
          <button
            className="button"
            id="loginBtn"
            onClick={ handleClick }
          >
            LogIn
          </button>
          <button
            className="button"
            id="siginBtn"
            onClick={ handleClick }
          >
            SignIn
          </button>
        </div>
      </form>
    </div>
  );
}
