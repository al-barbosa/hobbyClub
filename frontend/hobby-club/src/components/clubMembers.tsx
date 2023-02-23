import '../styles/ClubMembers.css'
import { NavLink } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";
import { useMediaQuery } from 'react-responsive'

export default function ClubMembers(props: {
  userList: IUser[]
  setShowMembers?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  
  const mediaQuery = useMediaQuery({
    query: '(max-width: 860px)'
  })
  
  const handleCloseMembers = () => {
    if (props.setShowMembers) props.setShowMembers(false);
  }

  return (
    <div id='membersSection'>
      {mediaQuery && <span
        className='close'
        onClick={handleCloseMembers}
      >
        &times;
      </span>}
      <h2>Club members:</h2>
      {props.userList
        .sort((a, b) =>
        a.username.localeCompare(b.username))
        .map((user, index) => <div
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