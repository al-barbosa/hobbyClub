import IHobby from "../interfaces/hobby.interface"

export default function HobbyMessages(props: {
  hobbySelected?: IHobby
}) {
  return (
    <div>
      {props.hobbySelected?.messages ?
      props.hobbySelected.messages.map((message, index) => <div
        key={index}
      >
          <span>{message.text}</span>
        </div>) :
        <span>Escolha um hobby</span>}
    </div>
  )
}