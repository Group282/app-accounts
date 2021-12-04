export enum EMessageType {
  info,
  warning,
  error,
}

export type TMessage = string;

interface IMessageBoxProps {
  type?: EMessageType;
  message: TMessage;
}

export default IMessageBoxProps;