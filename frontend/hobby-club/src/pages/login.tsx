import '../styles/Login.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import UserAPI from '../helper/UserAPI';


export default function Login() {
  const userApi = new UserAPI();
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [signUp, setSignUp] = useState(false);

  // const [passwordType, setPasswordType] = useState('password');

  const cleanLogin = (): void => {
    setLoginInfo({
      email: '',
      password: '',
    })
  }

  const cleanSignIn = (): void => {
    setSignUpInfo({
      email: '',
      username: '',
      password: '',
    })
  }

  // const togglePassword = () => {
  //   if (passwordType === "password") {
  //     setPasswordType("text")
  //     return;
  //   }
  //   setPasswordType("password")
  // }

  const handleLoginInfo = ({ target }: { target: { name: string, value: string } }) => {
    const { name, value } = target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSignUpInfo = ({ target }: { target: { name: string, value: string } }) => {
    const { name, value } = target;
    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const eraseCookies = () => {
    document.cookie = JSON.stringify({
      email: '',
      id: '',
      token: '',
      username: ''
    })
  }

  useEffect(() => {
    eraseCookies()
  }, [])

  const handleLogin = async (e: React.SyntheticEvent): Promise<NavigateFunction | void> => {
    e.preventDefault();
    const userInfo = await userApi.login(loginInfo.email, loginInfo.password);
    if (userInfo.message) {
      eraseCookies();
      setErrorMessage(userInfo.message)
    };
    if (userInfo.token) {
      setErrorMessage('');
      document.cookie = JSON.stringify(userInfo);
      navigate(`/profile/${userInfo.id}`);
    }
  };

  const handleSignUp = async (e: React.SyntheticEvent): Promise<NavigateFunction | void> => {
    e.preventDefault();
    const newUserInfo = await userApi.createUser(signUpInfo.email, signUpInfo.username, signUpInfo.password);
    if (newUserInfo.message) {
      eraseCookies();
      setErrorMessage(newUserInfo.message)
    };
    if (newUserInfo.token) {
      setErrorMessage('');
      document.cookie = JSON.stringify(newUserInfo);
      navigate(`/profile/${newUserInfo.id}`);
    }
  }

  const handleSetSignUp = (): void => {
    setErrorMessage('');
    cleanLogin();
    cleanSignIn();
    setSignUp(!signUp);
  }

  return (
    !signUp ?
      <div id="loginPage">
        <form className="loginForm">
          <h1>Welcome to the</h1>
          <h1>HobbyClub</h1>
          <label htmlFor="email">Email:</label>
          <input
            className='form-control'
            type="text"
            id="email"
            name="email"
            value={loginInfo.email}
            onChange={handleLoginInfo}
          />
          <label htmlFor="password">Password:</label>
          <input
            className='form-control'
            type='password'
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={handleLoginInfo}
          />
          {errorMessage &&
            <span id='errorMessage'>{errorMessage}</span>}
          <div className="buttonsDiv">
            <button
              type="button"
              className="btn btn-warning btnClass"
              id="loginBtn"
              onClick={handleLogin}
            >
              LogIn
            </button>
            <button
              type="button"
              className="btn btn-warning btnClass"
              id="siginBtn"
              onClick={handleSetSignUp}
            >
              SignIn
            </button>
          </div>
        </form>
      </div>
      :
      <div id="loginPage">
        <form className="loginForm">
          <label htmlFor="email">Email:</label>
          <input
            className='form-control'
            type="text"
            id="email"
            name="email"
            value={signUpInfo.email}
            onChange={handleSignUpInfo}
          />
          <label htmlFor="username">Username:</label>
          <input
            className='form-control'
            type="text"
            id="username"
            name="username"
            value={signUpInfo.username}
            onChange={handleSignUpInfo}
          />
          <label htmlFor="password">Password:</label>
          <input
            className='form-control'
            type="text"
            id="password"
            name="password"
            value={signUpInfo.password}
            onChange={handleSignUpInfo}
          />
          {errorMessage &&
            <span id='errorMessage'>{errorMessage}</span>}
          <div className="buttonsDiv">
            <button
              type="button"
              className="btn btn-warning btnClass"
              id="loginBtn"
              onClick={handleSignUp}
            >
              Create account
            </button>
            <button
              type="button"
              className="btn btn-warning btnClass"
              id="siginBtn"
              onClick={handleSetSignUp}
            >
              Back to login
            </button>
          </div>
        </form>
      </div>
  )
}
