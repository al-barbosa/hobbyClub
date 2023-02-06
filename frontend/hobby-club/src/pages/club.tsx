import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hobbies from "../components/hobbies";
import Header from "../components/clubHeader";
import ClubAPI from "../helper/ClubAPI";
import IClub from "../interfaces/club.interface";
import HobbyMessages from "../components/hobbiesMessages";
import IHobby from "../interfaces/hobby.interface";

export default function Club() {

  const [clubInfo, setClubInfo] = useState({} as IClub);

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

  const location = useLocation();

  useEffect(() => {
    const clubApi = new ClubAPI();
    const getClubInfo = async() => {
      const pathName = location.pathname.split('/');
      const clubId = pathName[2];
      const clubInfo = await clubApi.getInfo(clubId);
      setClubInfo(clubInfo);
    }
    getClubInfo();
  }, [location.pathname]);

  return (
    <div>
      {clubInfo.name &&
        <Header
          clubInfo={clubInfo}
      />}
      {clubInfo.hobbies &&
      <Hobbies
        hobbyList={clubInfo.hobbies}
        setHobbySelected={setHobbySelected}
      />}
      <HobbyMessages
        hobbySelected={hobbySelected}
      />
    </div>
  )
}