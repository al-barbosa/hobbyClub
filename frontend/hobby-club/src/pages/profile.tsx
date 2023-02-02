import '../styles/Login.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserAPI from '../helper/UserAPI';
import { IUserClubs } from '../interfaces/user.interface';
import Header from '../components/header';
import Clubs from '../components/clubs';


export default function Profile() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    id: '',
  });

  const [userClubs, setUserClubs] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (!document.cookie) navigate('/');
    const userInfo: IUserClubs = JSON.parse(document.cookie);
    const userApi = new UserAPI();
    const getUserClubs = async() => {
      const pathName = location.pathname.split('/');
      const userId = pathName[2];
      const getInfo: any = await userApi.getUser(userId, `${userInfo.token}`);
      if (!getInfo.club) navigate('/');
      const { email, username, id } = getInfo
      setUserInfo({ email, username, id });
      setUserClubs(getInfo.club)
    }
    getUserClubs();
  }, [navigate, location.pathname])

  return (
    <div id="profilePage">
      <Header
        userInfo={ userInfo }
      />
      {userClubs[0] &&
      <Clubs
        userClubs={ userClubs }
      />}
      <h1>Profile</h1>
    </div>
  )
}
