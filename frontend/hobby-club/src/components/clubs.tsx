import React from 'react';
import '../styles/Clubs.css'
import IClub from '../interfaces/club.interface';
import meeting from '../icons/meeting.png'
import { NavLink } from 'react-router-dom';

export default function Clubs(props: { userClubs: IClub[] }) {
  return (
    <div id='clubPage'>
      <img className='clubIcon' src={ meeting } alt='Icon for club list' />
      {props.userClubs.map((club, index) => <div className='userClub'>
        <NavLink
          className='clubLink'
          id={`${club.id}`}
          to={`/club/${club.id}`}
        >
          {club.name}
        </NavLink><br/>
        {club.hobbies
          .filter((hobby) => hobby.finished === false)
          .map((hobby) => <span className='curretnHobby'>{hobby.name}</span>)}
      </div>
      )}
    </div>
  )
}