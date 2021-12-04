import s from './MessageBox.module.scss';
import IMessageBoxProps, { EMessageType } from "../../types/MessageBox.props";
import classNames from 'classnames';

const MessageBox = ({ type, message }: IMessageBoxProps ):JSX.Element => {
  let messageTypeClassName = 'info';

  switch (type) {
    case EMessageType.info:
      messageTypeClassName = 'info';
      break;
    case EMessageType.warning:
      messageTypeClassName = 'warning';
      break;
    case EMessageType.error:
      messageTypeClassName = 'error';
      break;
    default:
      break;
  }
  
  return (
    <div className={classNames(s.messageBox, s[messageTypeClassName])}>
      {message}
    </div>
  )
}

export default MessageBox;