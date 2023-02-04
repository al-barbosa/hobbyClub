import React from 'react';
import '../styles/Clubs.css'
import IClub from '../interfaces/club.interface';
import meeting from '../icons/meeting.png'
import notFound from '../icons/notFound.png'
import { NavLink } from 'react-router-dom';

export default function Clubs(props: { userClubs: IClub[] }) {
  return (
    <div id='clubPage'>
      <img className='clubIcon' src={ meeting } alt='Icon for club list' />
      <div className='clubList'>
        {props.userClubs.map((club, index) => <div className='userClub' key={index}>
          <NavLink
            className='clubLink'
            id={`${club.id}`}
            to={`/club/${club.id}`}
          >
            {club.name}
          </NavLink><br/>
          {club.hobbies
            .filter((hobby) => hobby.finished === false)
            .map((hobby, index) => <div
              key={index}
              className='hobbyBox'
              >
                {hobby.img !== null ?
                  <img src={hobby.img} alt={hobby.name} className='hobbyCover' /> :
                  <img src={notFound} alt={hobby.name} className='hobbyCover' />
                }
                <span className='currentHobby'>{hobby.name}</span>
              </div>)}
        </div>
        )}
      </div>
    </div>
  )
}