import '../styles/Header.css';
import mailboxNew from '../icons/mailboxNew.png';
import mailboxEmpty from '../icons/mailboxEmpty.png';
import mail from '../icons/mail.png';
import magnifyingGlass from '../icons/magnifyingGlass.png';
import React from 'react';
import { IUser } from '../interfaces/user.interface';
import { IUserMessage } from '../interfaces/message.interface';

interface HeaderProps {
  userInfo: IUser;
  messages: IUserMessage[];
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header(props: HeaderProps) {
  const { userInfo, messages, setShowMessages } = props;

  const renderUserName = () => {
    const { loggedUser, username } = userInfo;
    return <h1 id='userName'>{loggedUser ? `Olá, ${username}` : username}</h1>;
  };

  const renderMessagesButton = () => {
    const noNewMessages = messages.every((message) => message.read);
    const imgSrc = noNewMessages ? mailboxEmpty : mailboxNew;

    if (userInfo.loggedUser) {
      return (
        <button className='showMsgBtn' onClick={() => setShowMessages(true)}>
          <img className='message headerImg' src={imgSrc} alt='New messages in box' />
        </button>
      );
    } else {
      return <img className='message headerImg' src={mail} alt='Send message' />;
    }
  };

  return (
    <div id='header'>
      <div className='info'>{renderUserName()}</div>
      <div className='icons'>
        <img className='magnifyingGlass headerImg' src={magnifyingGlass} alt='Search tool' />
        {renderMessagesButton()}
      </div>
    </div>
  );
}
