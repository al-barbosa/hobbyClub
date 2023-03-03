import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ClubAPI from '../helper/ClubAPI';
import AddHobby from '../components/addHobby';
import ClubMembers from '../components/clubMembers';
import Header from '../components/clubHeader';
import HobbyMessages from '../components/hobbiesMessages';
import Hobbies from '../components/hobbies';
import IClub from '../interfaces/club.interface';
import IHobby from '../interfaces/hobby.interface';
import { IClubMessage } from '../interfaces/message.interface';
import '../styles/ClubPage.css';

export default function Club() {
  const [clubInfo, setClubInfo] = useState<IClub>({} as IClub);
  const [clubMessages, setClubMessages] = useState<IClubMessage[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [addedWindow, setAddedWindow] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [hobbySelected, setHobbySelected] = useState<IHobby>({
    clubId: 0,
    createdAt: '',
    finished: false,
    id: 0,
    name: '',
    type: '',
    updatedAt: '',
    img: '',
  });
  const [postedMessage, setPostedMessage] = useState({
    message: '',
    userName: JSON.parse(document.cookie).username,
    userId: JSON.parse(document.cookie).id,
  });
  const [selectedId, setSelectedId] = useState('');
  const [newMessage, setNewMessage] = useState({
    message: '',
    userId: JSON.parse(document.cookie).id,
  });
  const location = useLocation();
  const mediaQuery = useMediaQuery({
    query: '(max-width: 860px)',
  });

  const finishHobby = async (hobbyId: number) => {
    const clubApi = new ClubAPI();
    await clubApi.endHobbie(clubInfo.id, hobbyId, JSON.parse(document.cookie).token);
    setRerender(!rerender);
  };

  useEffect(() => {
    const clubApi = new ClubAPI();
    const getClubInfo = async () => {
      const pathName = location.pathname.split('/');
      const clubId = pathName[2];
      const retrievedClubInfo = await clubApi.getInfo(clubId);
      setClubInfo(retrievedClubInfo);

      const userId = JSON.parse(document.cookie).id;
      const filteredList = (retrievedClubInfo as IClub).user.some((user) => user.id === userId);
      if (filteredList) setIsMember(true);
      if (userId === retrievedClubInfo.admin.id) setIsAdmin(true);

      const retrievedMessages = await clubApi.getMessages(clubId);
      setClubMessages(retrievedMessages);
    };
    getClubInfo();
  }, [location.pathname, isMember, rerender]);

  const handleShowHobbies = () => setShowHobbies(true);
  const handleShowMembers = () => setShowMembers(true);

  return (
    <div>
      <div className={addedWindow ? 'mainClubPage' : ''}>
        <div className="clubHeaderComponent">
          {clubInfo.name && (
            <Header
              clubInfo={clubInfo}
              setHobbySelected={setHobbySelected}
              setSelectedId={setSelectedId}
              isMember={isMember}
              clubId={`${clubInfo.id}`}
              setIsMember={setIsMember}
            />
          )}
        </div>
        <div className="clubBody">
          {mediaQuery && (
            <div className="menuList">
              <button onClick={handleShowHobbies} className="menuBtn">
                Hobbies
              </button>
              <button onClick={handleShowMembers} className="menuBtn">
                Members
              </button>
            </div>
          )}
          {showHobbies && mediaQuery && (
            <div className="clubHobbiesComponent">
              {clubInfo.hobbies && (
                <Hobbies
                  hobbyList={clubInfo.hobbies}
                  setHobbySelected={setHobbySelected}
                  setPostedMessage={setPostedMessage}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  finishHobby={finishHobby}
                  isAdmin={isAdmin}
                  setAddedWindow={setAddedWindow}
                  setShowHobbies={setShowHobbies}
                />
              )}
            </div>
          )}
          {showMembers && mediaQuery && (
            <div className="membersList">
              {clubInfo.user && (
                <ClubMembers
                  userList={clubInfo.user}
                  setShowMembers={setShowMembers}
                />
              )}
            </div>
          )}
          {!mediaQuery && (
            <div className="clubHobbiesComponent">
              {clubInfo.hobbies && (
                <Hobbies
                  hobbyList={clubInfo.hobbies}
                  setHobbySelected={setHobbySelected}
                  setPostedMessage={setPostedMessage}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  finishHobby={finishHobby}
                  isAdmin={isAdmin}
                  setAddedWindow={setAddedWindow}
                />
              )}
            </div>
          )}
          <div className="messagesComponent">
            <HobbyMessages
              hobbySelected={hobbySelected}
              postedMeessage={postedMessage}
              setPostedMeessage={setPostedMessage}
              clubMessages={clubMessages}
              setClubMessages={setClubMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              clubId={clubInfo.id}
              isMember={isMember}
            />
          </div>
          {!mediaQuery && (
            <div className="membersList">
              {clubInfo.user && <ClubMembers userList={clubInfo.user} />}
            </div>
          )}
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
  );
}