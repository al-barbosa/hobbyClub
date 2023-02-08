import { NavLink } from "react-router-dom";
import IClub from "../interfaces/club.interface";
import IHobby from "../interfaces/hobby.interface";

export default function profileHeader(props: {
  clubInfo: IClub
  setHobbySelected: React.Dispatch<React.SetStateAction<IHobby>>,
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}) {

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
    props.setSelectedId('')
  }

  return (
    <div>
      <button onClick={cleanHobbySelected}>
        <h1 id='clubName'>{props.clubInfo.name}</h1>
      </button>
      <h3 id='clubAdmin'>Club admin: <NavLink
        className='adminLink'
        to={`/profile/${props.clubInfo.admin.id}`}
      >
        {props.clubInfo.admin.username}
      </NavLink></h3>
    </div>
  )
}