import React from 'react';
import IClub from '../interfaces/club.interface';
// import { useNavigate, NavigateFunction } from 'react-router-dom';

export default function Clubs(props: { userClubs: IClub[] }) {
  return (
    <h1>{props.userClubs[0].name}</h1>
  )
}