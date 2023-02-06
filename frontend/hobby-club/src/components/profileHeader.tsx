import '../styles/Header.css'
import mailboxNew from '../icons/mailboxNew.png'
import mailboxEmpty from '../icons/mailboxEmpty.png'
import mail from '../icons/mail.png'
import magnifyingGlass from '../icons/magnifyingGlass.png'
import React from 'react';
import { IUser } from '../interfaces/user.interface';
import IMessage from '../interfaces/message.interface';
// import { useNavigate, NavigateFunction } from 'react-router-dom';

export default function Header(props: {
  userInfo: IUser,
  messages: IMessage[],
  setShowMessages: React.Dispatch<React.SetStateAction<boolean>>,
}) {

  return (
    <div id="header">
      <div className="info">
        {props.userInfo.loggedUser ?
          <h1 id='userName'>Olá, {props.userInfo.username}</h1> :
          <h1 id='userName'>{props.userInfo.username}</h1>
        }
      </div>
      <div className="icons">
        <img className='magnifyingGlass headerImg' src={ magnifyingGlass } alt='Search tool' />
        {props.userInfo.loggedUser ?
          (props.messages.every((message) => message.read) ?
          <button
            className='showMsgBtn'
            onClick={() => props.setShowMessages(true)}
          >
            <img className='message headerImg' src={ mailboxEmpty } alt='New messages in box' />
          </button> :
          <button
            className='showMsgBtn'
            onClick={() => props.setShowMessages(true)}
          >
            <img className='message headerImg' src={ mailboxNew } alt='New messages in box' />
          </button> )
          : <img className='message headerImg' src={ mail } alt='Send message' />
        }
      </div>
    </div>

  )
}