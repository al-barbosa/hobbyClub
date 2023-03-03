import '../styles/HobbyMessages.css'
import { NavLink } from "react-router-dom"
import IHobby from "../interfaces/hobby.interface"
import { useState } from 'react'
import HobbyAPI from '../helper/HobbyAPI'
import { IClubMessage } from '../interfaces/message.interface'
import ClubAPI from '../helper/ClubAPI'

export default function HobbyMessages(props: {
  hobbySelected: IHobby
  clubId: number
  newMessage: {
    message: string;
    userId: any;
  }
  setNewMessage: React.Dispatch<React.SetStateAction<{
    message: string;
    userId: any;
  }>>
  postedMeessage: {
    message: string;
    userName: any;
    userId: any;
  }
  setPostedMeessage: React.Dispatch<React.SetStateAction<{
    message: string;
    userName: any;
    userId: any;
}>>
  clubMessages: IClubMessage[]
  setClubMessages: React.Dispatch<React.SetStateAction<IClubMessage[]>>
  isMember: boolean
}) {

  const hobbyApi = new HobbyAPI();
  const clubApi = new ClubAPI();

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
    props.setPostedMeessage((prevInfo) => ({
      ...prevInfo,
      message: newMessage.message,
    }))
    setNewMessage({
      message: '',
      userId: JSON.parse(document.cookie).id
    })
  }

  const handleSubmitGeneral = async() => {
    const tkn = JSON.parse(document.cookie).token;
    await clubApi.postMessage(
      `${props.clubId}`,
      newMessage.userId,
      newMessage.message,
      tkn
    )
    const nClubMessages = await clubApi.getMessages(`${props.clubId}`);
    props.setClubMessages(nClubMessages)
    setNewMessage({
      message: '',
      userId: JSON.parse(document.cookie).id
    })
  }

  const formatDate = (date: string) => {
    const dateObject = new Date(date);
    const formattedDate = `${dateObject.getHours()}:${dateObject.getMinutes()} ${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div>
      {props.hobbySelected?.messages ?
        <div className='hobbyMessageBody'>
          {props.hobbySelected.messages
            .sort(function(a, b) {
              return a.createdAt > b.createdAt ? 1 : 0;
            })
            .map((message, index) => <div
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
              <span className='hobbyMessageDate'>{formatDate(message.createdAt)}</span>
            </div>
            <span className='hobbyMessageText'>{message.text}</span>
          </div>)}
          {props.postedMeessage.message ?
          <div
          className='hobbyMessage'
        >
          <div className='messageHeader'>
            <NavLink
              className='messageUserLink'
              to={`/profile/${props.postedMeessage.userId}`}
            >
              <span className='hobbyMessageUser'>{props.postedMeessage.userName}</span>
            </NavLink>
            <span className='hobbyMessageDate'>{formatDate(`${new Date()}`)}</span>
          </div>
          <span className='hobbyMessageText'>{props.postedMeessage.message}</span>
        </div> : (props.isMember && <div
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
          </button></div>)}
        </div> :
        <div className='hobbyMessageBody'>
        {props.clubMessages.map((message, index) => <div
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
            <span className='hobbyMessageDate'>{formatDate(message.createdAt)}</span>
          </div>
          <span className='hobbyMessageBody'>{message.text}</span>
        </div>)}
        {props.postedMeessage.message ?
        <div
        className='hobbyMessage'
      >
        <div className='messageHeader'>
          <NavLink
            className='messageUserLink'
            to={`/profile/${props.postedMeessage.userId}`}
          >
            <span className='hobbyMessageUser'>{props.postedMeessage.userName}</span>
          </NavLink>
          <span className='hobbyMessageDate'>{formatDate(`${new Date()}`)}</span>
        </div>
        <span className='hobbyMessageBody'>{props.postedMeessage.message}</span>
      </div> : (props.isMember && <div
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
          onClick={handleSubmitGeneral}
        >
          Post
        </button></div>)}
      </div>}
    </div>
  )
}