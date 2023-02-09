import '../styles/Messages.css'
import { IUserMessage } from '../interfaces/message.interface';

export default function Message(props: {messages: IUserMessage[]}) {
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