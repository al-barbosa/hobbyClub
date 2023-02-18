import '../styles/Hobbies.css';
import book from '../icons/book.png';
import end from '../icons/end.png';
import add from '../icons/add.png';
import camera from '../icons/camera.png';
import joystick from '../icons/joystick.png';
import IHobby from "../interfaces/hobby.interface";
import notFound from '../icons/notFound.png'
import HobbyAPI from '../helper/HobbyAPI';

export default function Hobbies(props: {
  setHobbySelected: React.Dispatch<React.SetStateAction<IHobby>>,
  setPostedMeessage: React.Dispatch<React.SetStateAction<{
    message: string;
    userName: any;
    userId: any;
  }>>
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  finishHobbie: (hobbyId: number) => Promise<void>;
  setAddedWindow: React.Dispatch<React.SetStateAction<boolean>>;
  hobbyList: IHobby[];
  selectedId: string;
  isAdmin: boolean;
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
      {props.hobbyList
        .map((hobby, index) => <div
          className='hobbySideBox'
          key={index}
        >
          {(props.isAdmin  && index === 0) && ((!hobby.finished) ? <button
            onClick={() => props.finishHobbie(hobby.id)}
          >
            <img src={end} alt='End icon' className='typeIcon' />
            <span>End current hobby</span>
          </button> : <button
            onClick={() => props.setAddedWindow(true)}
          >
            <img src={add} alt='Add icon' className='typeIcon' />
            <span>Add new hobby</span>
          </button>)}
          <button
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
              <div className='hobbyNameHeader'>
                <h3 className='hobbyName'>{hobby.name}</h3>
              </div>
              {hobby.img !== null ?
                <img src={hobby.img} alt={hobby.name} className='hobbyCover' /> :
                <img src={notFound} alt={hobby.name} className='hobbyCover' />
              }
            </div>
          </button>
        </div>)}
    </div>
  )
}