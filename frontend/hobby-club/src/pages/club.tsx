import '../styles/ClubPage.css'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import Hobbies from '../components/hobbies';
import Header from '../components/clubHeader';
import ClubAPI from '../helper/ClubAPI';
import IClub from '../interfaces/club.interface';
import HobbyMessages from '../components/hobbiesMessages';
import IHobby from '../interfaces/hobby.interface';
import { IClubMessage } from '../interfaces/message.interface';
import ClubMembers from '../components/clubMembers';
import AddHobby from '../components/addHobby';
import meeting from '../icons/meeting.png'

export default function Club() {

  const [clubInfo, setClubInfo] = useState({} as IClub);

  const [clubMessages, setClubMessages] = useState([] as IClubMessage[]);

  const [isMember, setIsMember] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [rerender, setRerender] = useState(false);

  const [addedWindow, setAddedWindow] = useState(false);

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
  });

  const [selectedId, setSelectedId] = useState('')

  const [newMessage, setNewMessage] = useState({
    message: '',
    userId: JSON.parse(document.cookie).id
  });

  const mediaQuery = useMediaQuery({
    query: '(max-width: 860px)'
  })


  const location = useLocation();

  const finishHobbie = async (hobbyId: number) => {
    const clubApi = new ClubAPI();
    await clubApi.endHobbie(clubInfo.id, hobbyId, JSON.parse(document.cookie).token);
    setRerender(!rerender);
  }

  useEffect(() => {
    const clubApi = new ClubAPI();
    const getClubInfo = async () => {
      const pathName = location.pathname.split('/');
      const clubId = pathName[2];
      const retrivedClubInfo = await clubApi.getInfo(clubId);
      setClubInfo(retrivedClubInfo);

      const userId = JSON.parse(document.cookie).id;
      const filteredList = (retrivedClubInfo as IClub).user.some((user) => user.id === userId);
      if (filteredList) setIsMember(true);
      if (userId === retrivedClubInfo.admin.id) setIsAdmin(true);

      const retrivedMessages = await clubApi.getMessages(clubId);
      setClubMessages(retrivedMessages);
    }
    getClubInfo();
  }, [location.pathname, isMember, rerender]);

  return (
    <div>
      <div className={`${addedWindow && 'mainClubPage'}`}>
        <div className='clubHeaderComponent'>
          {clubInfo.name &&
            <Header
              clubInfo={clubInfo}
              setHobbySelected={setHobbySelected}
              setSelectedId={setSelectedId}
              isMember={isMember}
              clubId={`${clubInfo.id}`}
              setIsMember={setIsMember}
            />}
        </div>
        <div className='clubBody'>
          {mediaQuery ?
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item" type="button">Action</button>
              <button className="dropdown-item" type="button">Another action</button>
              <button className="dropdown-item" type="button">Something else here</button>
            </div>
          </div>
            : <div className='clubHobbiesComponent'>
              {clubInfo.hobbies &&
                <Hobbies
                  hobbyList={clubInfo.hobbies}
                  setHobbySelected={setHobbySelected}
                  setPostedMeessage={setPostedMeessage}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  finishHobbie={finishHobbie}
                  isAdmin={isAdmin}
                  setAddedWindow={setAddedWindow}
                />}
            </div>}
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
              isMember={isMember}
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
      <div className={`${!addedWindow && 'noneWindow'} addHobbySection`}>
        <AddHobby
          clubId={clubInfo.id}
          setAddedWindow={setAddedWindow}
          setRerender={setRerender}
          rerender={rerender}
        />
      </div>
    </div>
  )
}