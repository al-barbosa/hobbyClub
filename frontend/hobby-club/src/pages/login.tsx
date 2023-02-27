import '../styles/Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../helper/UserAPI';

interface LoginInfo {
  email: string;
  password: string;
}

interface SignUpInfo {
  email: string;
  username: string;
  password: string;
}

export default function Login(): JSX.Element {
  const userApi = new UserAPI();
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: '',
  });

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: '',
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [signUp, setSignUp] = useState(false);

  const cleanLogin = (): void => {
    setLoginInfo({
      email: '',
      password: '',
    });
  };

  const cleanSignUp = (): void => {
    setSignUpInfo({
      email: '',
      username: '',
      password: '',
    });
  };

  const eraseCookies = (): void => {
    document.cookie = JSON.stringify({
      email: '',
      id: '',
      token: '',
      username: '',
    });
  };

  useEffect(() => {
    eraseCookies();
  }, []);

  const handleLoginInfo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSignUpInfo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const userInfo = await userApi.login(loginInfo.email, loginInfo.password);
    if (userInfo.message) {
      eraseCookies();
      setErrorMessage(userInfo.message);
    }
    if (userInfo.token) {
      setErrorMessage('');
      document.cookie = JSON.stringify(userInfo);
      navigate(`/profile/${userInfo.id}`);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newUserInfo = await userApi.createUser(signUpInfo.email, signUpInfo.username, signUpInfo.password);
    if (newUserInfo.message) {
      eraseCookies();
      setErrorMessage(newUserInfo.message);
    }
    if (newUserInfo.token) {
      setErrorMessage('');
      document.cookie = JSON.stringify(newUserInfo);
      navigate(`/profile/${newUserInfo.id}`);
    }
  };

  const handleToggleSignUp = (): void => {
    setErrorMessage('');
    cleanLogin();
    cleanSignUp();
    setSignUp((prevSignUp) => !prevSignUp);
  };



  return (
    <div id="loginPage">
      <form className="loginForm" onSubmit={signUp ? handleSignUp : handleLogin}>
        <h1>Welcome to HobbyClub</h1>
        {signUp ? (
          <>
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="text"
              id="email"
              name="email"
              value={signUpInfo.email}
              onChange={handleSignUpInfo}
            />
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              value={signUpInfo.username}
              onChange={handleSignUpInfo}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={signUpInfo.password}
              onChange={handleSignUpInfo}
            />
            {errorMessage && <span id="errorMessage">{errorMessage}</span>}
            <div className="buttonsDiv">
              <button type="submit" className="btn btn-warning btnClass" id="createAccountBtn">
                Create Account
              </button>
              <button type="button" className="btn btn-warning btnClass" id="backToLoginBtn" onClick={handleToggleSignUp}>
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              type="text"
              id="email"
              name="email"
              value={loginInfo.email}
              onChange={handleLoginInfo}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={loginInfo.password}
              onChange={handleLoginInfo}
            />
            {errorMessage && <span id="errorMessage">{errorMessage}</span>}
            <div className="buttonsDiv">
              <button type="submit" className="btn btn-warning btnClass" id="loginBtn">
                Log In
              </button>
              <button type="button" className="btn btn-warning btnClass" id="signUpBtn" onClick={handleToggleSignUp}>
                Sign Up
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
