import IHobby from "../interfaces/hobby.interface";
import notFound from '../icons/notFound.png'

export default function Hobbies(props: {hobbyList: IHobby[]}) {
  console.log(props)
  return (
    <div>
      {props.hobbyList.map((hobby, index) => <div key={index}>
        <h3 className='hobbyName'>{hobby.name}</h3>
        {hobby.img !== null ?
          <img src={hobby.img} alt={hobby.name} className='hobbyCover' /> :
          <img src={notFound} alt={hobby.name} className='hobbyCover' />
        }
      </div>)}
    </div>
  )
}