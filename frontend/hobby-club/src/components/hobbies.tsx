import '../styles/Hobbies.css';
import book from '../icons/book.png';
import camera from '../icons/camera.png';
import joystick from '../icons/joystick.png';
import IHobby from "../interfaces/hobby.interface";
import notFound from '../icons/notFound.png'
import HobbyAPI from '../helper/HobbyAPI';

export default function Hobbies(props: {
  hobbyList: IHobby[],
  setHobbySelected: React.Dispatch<React.SetStateAction<IHobby>>,
  setPostedMeessage: React.Dispatch<React.SetStateAction<{
    message: string;
    userName: any;
    userId: any;
  }>>
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}) {

  const showMessages = async (hobbyId: string) => {
    const hobbyApi = new HobbyAPI();
    const hobbyInfo = await hobbyApi.getHobby(hobbyId);
    props.setHobbySelected(hobbyInfo);
    props.setPostedMeessage({
      message: '',
      userName: JSON.parse(document.cookie).username,
      userId: JSON.parse(document.cookie).id,
    })
    props.setSelectedId(hobbyId);
  }

  const finished = (hobby: IHobby) => hobby.finished ? 'hobbyContainer' : 'hobbyContainerCurrent'
  const selected = (hobby: IHobby) => `${hobby.id}` === props.selectedId ? 'selectedHobby' : ''

  return (
    <div id='hobbiesSection'>
      {props.hobbyList.map((hobby, index) => <button
        key={index}
        className={`${finished(hobby)} ${selected(hobby)}`}
        onClick={() => showMessages(`${hobby.id}`)}
      >
        {hobby.type === 'movie' ?
          <img src={camera} alt='Movie icon' className='typeIcon' /> :
          (hobby.type === 'book' ?
            <img src={book} alt='Book icon' className='typeIcon' /> :
            <img src={joystick} alt='Game icon' className='typeIcon' />)}
        <div className='nameAndImage'>
          <h3 className='hobbyName'>{hobby.name}</h3>
          {hobby.img !== null ?
            <img src={hobby.img} alt={hobby.name} className='hobbyCover' /> :
            <img src={notFound} alt={hobby.name} className='hobbyCover' />
          }
        </div>
      </button>)}
    </div>
  )
}