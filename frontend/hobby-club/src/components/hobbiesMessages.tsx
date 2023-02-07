import '../styles/HobbyMessages.css'
import { NavLink } from "react-router-dom"
import IHobby from "../interfaces/hobby.interface"
import { useState } from 'react'
import HobbyAPI from '../helper/HobbyAPI'

export default function HobbyMessages(props: {
  hobbySelected: IHobby
}) {

  const hobbyApi = new HobbyAPI();

  const [postedMeessage, setPostedMeessage] = useState({
    message: '',
    userName: JSON.parse(document.cookie).username,
    userId: JSON.parse(document.cookie).id,
    date: new Date()
  })

  const [newMessage, setNewMessage] = useState({
    message: '',
    userId: JSON.parse(document.cookie).id
  })

  const handleNewMessage = ({ target }: { target: { name: string, value: string } }) => {
    const { name, value } = target;
    setNewMessage((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  const handleSubmit = async() => {
    const tkn = JSON.parse(document.cookie).token;
    await hobbyApi.postMessage(
      `${props.hobbySelected?.id}`,
      newMessage.userId,
      newMessage.message,
      tkn
    )
    setPostedMeessage((prevInfo) => ({
      ...prevInfo,
      message: newMessage.message,
    }))
  }

  return (
    <div>
      {props.hobbySelected?.messages ?
        <div className='hobbyMessageBody'>
          {props.hobbySelected.messages.map((message, index) => <div
            key={index}
            className='hobbyMessage'
          >
            <div className='messageHeader'>
              <NavLink
                className='messageUserLink'
                to={`/profile/${message.user.id}`}
              >
                <span className='hobbyMessageUser'>{message.user.username}</span>
              </NavLink>
              <span className='hobbyMessageDate'>{message.createdAt}</span>
            </div>
            <span className='hobbyMessageBody'>{message.text}</span>
          </div>)}
          {postedMeessage.message ?
          <div
          className='hobbyMessage'
        >
          <div className='messageHeader'>
            <NavLink
              className='messageUserLink'
              to={`/profile/${postedMeessage.userId}`}
            >
              <span className='hobbyMessageUser'>{postedMeessage.userName}</span>
            </NavLink>
            <span className='hobbyMessageDate'>{`${postedMeessage.date}`}</span>
          </div>
          <span className='hobbyMessageBody'>{postedMeessage.message}</span>
        </div> : <div
            className='input-group'
          >
            <textarea
              className='form-control'
              aria-label='With textarea'
              name='message'
              value={newMessage.message}
              onChange={handleNewMessage}
            />
          <button
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon2'
            disabled={
              newMessage.message ? false : true
            }
            onClick={handleSubmit}
          >
            Post
          </button></div>}
        </div> :
        <span>Escolha um hobby</span>}
    </div>
  )
}