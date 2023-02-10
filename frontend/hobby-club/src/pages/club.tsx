import '../styles/ClubPage.css'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hobbies from '../components/hobbies';
import Header from '../components/clubHeader';
import ClubAPI from '../helper/ClubAPI';
import IClub from '../interfaces/club.interface';
import HobbyMessages from '../components/hobbiesMessages';
import IHobby from '../interfaces/hobby.interface';
import { IClubMessage } from '../interfaces/message.interface';
import ClubMembers from '../components/clubMembers';

export default function Club() {

  const [clubInfo, setClubInfo] = useState({} as IClub);

  const [clubMessages, setClubMessages] = useState([] as IClubMessage[])

  const [hobbySelected, setHobbySelected] = useState({
    clubId: 0,
    createdAt: '',
    finished: false,
    id: 0,
    name: '',
    type: '',
    updatedAt: '',
    img: ''
    } as IHobby);

  const [postedMeessage, setPostedMeessage] = useState({
    message: '',
    userName: JSON.parse(document.cookie).username,
    userId: JSON.parse(document.cookie).id,
  })

  const [selectedId, setSelectedId] = useState('')

  const [newMessage, setNewMessage] = useState({
    message: '',
    userId: JSON.parse(document.cookie).id
  })

  const location = useLocation();

  useEffect(() => {
    const clubApi = new ClubAPI();
    const getClubInfo = async() => {
      const pathName = location.pathname.split('/');
      const clubId = pathName[2];
      const clubInfo = await clubApi.getInfo(clubId);
      setClubInfo(clubInfo);
      const retrivedMessages = await clubApi.getMessages(clubId)
      setClubMessages(retrivedMessages)
    }
    getClubInfo();
  }, [location.pathname]);

  return (
    <div>
      <div className='clubHeaderComponent'>
        {clubInfo.name &&
          <Header
            clubInfo={clubInfo}
            setHobbySelected={setHobbySelected}
            setSelectedId={setSelectedId}
        />}
      </div>
      <div className='clubBody'>
        <div className='clubHobbiesComponent'>
          {clubInfo.hobbies &&
          <Hobbies
            hobbyList={clubInfo.hobbies}
            setHobbySelected={setHobbySelected}
            setPostedMeessage={setPostedMeessage}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />}
        </div>
        <div className='messagesComponent'>
          <HobbyMessages
            hobbySelected={hobbySelected}
            postedMeessage={postedMeessage}
            setPostedMeessage={setPostedMeessage}
            clubMessages={clubMessages}
            setClubMessages={setClubMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            clubId={clubInfo.id}
          />
        </div>
        <div className='membersList'>
          {clubInfo.user &&
          <ClubMembers
            userList={clubInfo.user}
          />}
        </div>
      </div>
    </div>
  )
}