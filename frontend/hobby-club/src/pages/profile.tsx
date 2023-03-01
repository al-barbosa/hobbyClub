import '../styles/Login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserAPI from '../helper/UserAPI';
import { IUserClubs } from '../interfaces/user.interface';
import Header from '../components/profileHeader';
import Clubs from '../components/clubs';
// import Message from '../components/messages';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    id: '',
    loggedUser: false,
  });
  const [messages, setMessages] = useState([]);
  const [userClubs, setUserClubs] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!document.cookie) navigate('/');
        const userInfo: IUserClubs = JSON.parse(document.cookie);
        const userApi = new UserAPI();
        const pathName = location.pathname.split('/');
        const userId = pathName[2];
        const getInfo: any = await userApi.getUser(userId, `${userInfo.token}`);
        if (!getInfo.club) navigate('/');
        const { email, username, id } = getInfo;
        setUserInfo({ email, username, id, loggedUser: userInfo.id === getInfo.id });
        const messages = await userApi.getMessage(userId, `${userInfo.token}`);
        setMessages(messages);
        setUserClubs(getInfo.club);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [navigate, location.pathname]);

  return (
    <div id="profilePage">
      {userInfo.username && (
        <Header
          userInfo={userInfo}
          messages={messages}
          setShowMessages={setShowMessages}
        />
      )}
      {userClubs[0] && <Clubs userClubs={userClubs} />}
      {/* {(showMessages && loggedUser) && <Message
        messages={ messages }
      />} */}
    </div>
  );
}

export default Profile;