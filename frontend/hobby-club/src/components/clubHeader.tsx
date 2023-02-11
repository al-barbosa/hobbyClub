import '../styles/ClubHeader.css'
import { NavLink } from "react-router-dom";
import join from '../icons/join.png'
import left from '../icons/left.png'
import UserAPI from '../helper/UserAPI';
import IClub from "../interfaces/club.interface";
import IHobby from "../interfaces/hobby.interface";

export default function profileHeader(props: {
  clubInfo: IClub;
  setHobbySelected: React.Dispatch<React.SetStateAction<IHobby>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  isMember: boolean;
  clubId: string;
  setIsMember: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const userApi = new UserAPI();

  const cleanHobbySelected = () => {
    props.setHobbySelected({
      clubId: 0,
      createdAt: '',
      finished: false,
      id: 0,
      name: '',
      type: '',
      updatedAt: '',
      img: ''
      })
  }

  const joinClub = async () => {
    await userApi.joinClub(JSON.parse(document.cookie).id, props.clubId, JSON.parse(document.cookie).token);
    props.setIsMember(true);
  }

  const exitClub = async () => {
    await userApi.leftClub(JSON.parse(document.cookie).id, props.clubId, JSON.parse(document.cookie).token);
    props.setIsMember(false);
  }

  return (
    <div id='clubHeader'>
      <div
        className='leftHeader'
      >
        <button
          onClick={cleanHobbySelected}
        >
          <h1 id='clubName'>{props.clubInfo.name}</h1>
        </button>
        <button
          onClick={props.isMember ? exitClub : joinClub }
        >
          { props.isMember ?
          <img src={left} alt='Left icon' className='clubIcon' /> :
          <img src={join} alt='Join icon' className='clubIcon' /> }
        </button>
      </div>
      <h3 id='clubAdmin'>Club admin: <NavLink
        className='adminLink'
        to={`/profile/${props.clubInfo.admin.id}`}
      >
        {props.clubInfo.admin.username}
      </NavLink></h3>
    </div>
  )
}