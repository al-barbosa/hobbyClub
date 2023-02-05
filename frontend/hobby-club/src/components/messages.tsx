import '../styles/Messages.css'
import IMessage from "../interfaces/message.interface";

export default function Message(props: {messages: IMessage[]}) {
  return (
    <div id='messageWindow'>
      <h3 id='messageHeader'>Mensagens:</h3>
      <tbody id='messageTable'>
        <tr>
          <th>Author</th>
          <th>Opened</th>
          <th>Received on</th>
          <th>Message preview</th>
        </tr>
        {props.messages.map(() => <div>

        </div>)}
      </tbody>
    </div>
  )
}