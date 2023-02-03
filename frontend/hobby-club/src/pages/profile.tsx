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
    loggedUser: false,
  });

  const [loggedUser, setLoggedUser] = useState(false)

  const [userClubs, setUserClubs] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (!document.cookie) navigate('/');
    const userInfo: IUserClubs = JSON.parse(document.cookie);
    const userApi = new UserAPI();
    const checkIfLogged = (cookieId: string, apiId: string) => {
      cookieId === apiId ? setLoggedUser(true) : setLoggedUser(false)
    }
    const getUserClubs = async() => {
      const pathName = location.pathname.split('/');
      const userId = pathName[2];
      const getInfo: any = await userApi.getUser(userId, `${userInfo.token}`);
      if (!getInfo.club) navigate('/');
      const { email, username, id } = getInfo
      checkIfLogged(userInfo.id, getInfo.id);
      setUserInfo({ email, username, id, loggedUser });
      setUserClubs(getInfo.club)
    }
    getUserClubs();
  }, [navigate, location.pathname, loggedUser])

  return (
    <div id="profilePage">
      <Header
        userInfo={ userInfo }
      />
      {userClubs[0] &&
      <Clubs
        userClubs={ userClubs }
      />}
    </div>
  )
}
