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
}) {
  const showMessages = async (hobbyId: string) => {
    const hobbyApi = new HobbyAPI();
    const hobbyInfo = await hobbyApi.getHobby(hobbyId);
    props.setHobbySelected(hobbyInfo);
    console.log(hobbyInfo)
  }
  return (
    <div id='hobbiesSection'>
      {props.hobbyList.map((hobby, index) => <button
        key={index}
        className={hobby.finished ? 'hobbyContainer' : 'hobbyContainerCurrent'}
        onClick={() => showMessages(`${hobby.id}`)}
      >
        <div className='nameSection'>
          {hobby.type === 'movie' ?
            <img src={camera} alt='Movie icon' className='typeIcon'/> :
              (hobby.type === 'book' ?
                <img src={book} alt='Book icon' className='typeIcon'/> :
                  <img src={joystick} alt='Game icon' className='typeIcon'/>)}
          <h3 className='hobbyName'>{hobby.name}</h3>
        </div>
        {hobby.img !== null ?
          <img src={hobby.img} alt={hobby.name} className='hobbyCover' /> :
          <img src={notFound} alt={hobby.name} className='hobbyCover' />
        }
      </button>)}
    </div>
  )
}