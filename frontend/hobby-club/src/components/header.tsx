import React from 'react';
import { IUser } from '../interfaces/user.interface';
// import { useNavigate, NavigateFunction } from 'react-router-dom';

export default function Header(props: { userInfo: IUser }) {
  return (
    <h1>{props.userInfo.username}</h1>
  )
}