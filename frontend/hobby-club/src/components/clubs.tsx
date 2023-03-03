import React from 'react';
import '../styles/Clubs.css';
import IClub from '../interfaces/club.interface';
import meeting from '../icons/meeting.png';
import notFound from '../icons/notFound.png';
import { NavLink } from 'react-router-dom';

interface ClubsProps {
  userClubs: IClub[];
}

export default function Clubs(props: ClubsProps) {
  const renderHobbyBoxes = (club: IClub) => {
    return club.hobbies
      .filter((hobby) => !hobby.finished)
      .map((hobby, index) => (
        <div key={index} className='hobbyBox'>
          <img
            src={hobby.img || notFound}
            alt={hobby.name}
            className='hobbyCover'
          />
          <span className='currentHobby'>{hobby.name}</span>
        </div>
      ));
  };

  const renderClubList = () => {
    return props.userClubs
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((club) => (
        <div className='userClub' key={club.id}>
          <NavLink className='clubLink' id={`${club.id}`} to={`/club/${club.id}`}>
            {club.name}
          </NavLink>
          <br />
          {renderHobbyBoxes(club)}
        </div>
      ));
  };

  return (
    <div id='clubPage'>
      <img className='clubIcon' src={meeting} alt='Icon for club list' />
      <div className='clubList'>{renderClubList()}</div>
    </div>
  );
}