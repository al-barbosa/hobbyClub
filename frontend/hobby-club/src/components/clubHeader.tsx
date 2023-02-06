import { NavLink } from "react-router-dom";
import IClub from "../interfaces/club.interface";

export default function profileHeader(props: {clubInfo: IClub}) {
  return (
    <div>
      <h1 id='clubName'>{props.clubInfo.name}</h1>
      <h3 id='clubAdmin'>Club admin: <NavLink
        className='adminLink'
        to={`/profile/${props.clubInfo.admin.id}`}
      >
        {props.clubInfo.admin.username}
      </NavLink></h3>
    </div>
  )
}