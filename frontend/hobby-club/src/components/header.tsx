import '../styles/Header.css'
import mailboxNew from '../icons/mailboxNew.png'
import mail from '../icons/mail.png'
import magnifyingGlass from '../icons/magnifyingGlass.png'
import React, { useEffect } from 'react';
import { IUser } from '../interfaces/user.interface';
// import { useNavigate, NavigateFunction } from 'react-router-dom';

export default function Header(props: { userInfo: IUser }) {
  useEffect(() => {
    console.log('x')
  },[])
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
          <img className='message headerImg' src={ mailboxNew } alt='New messages in box' /> :
          <img className='message headerImg' src={ mail } alt='Send message' />
        }
      </div>
    </div>

  )
}