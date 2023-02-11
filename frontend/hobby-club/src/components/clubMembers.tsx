import '../styles/ClubMembers.css'
import { NavLink } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";

export default function ClubMembers(props: { userList: IUser[] }) {
  return (
    <div id='membersSection'>
      <h2>Club members:</h2>
      {props.userList.map((user, index) => <div
          className='userNameSection'
          key={index}
        >
        <NavLink
          className='userLink'
          to={`/profile/${user.id}`}
        >
          <span className='clubMemberName'>{user.username}</span>
        </NavLink>
      </div>)}
    </div>
  )
}