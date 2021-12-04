import s from './StatusBadge.module.scss';
import IStatusBadgeProps from "../../types/StatusBadge.props";
import classNames from 'classnames';
import { EStatusType } from '../../types/AccountsTable.props';

const StatusBadge = ({ status }: IStatusBadgeProps ):JSX.Element => {
  let badgeTypeClassName = 'disable';

  switch (status) {
    case EStatusType.active:
      badgeTypeClassName = 'active';
      break;
    case EStatusType.disable:
      badgeTypeClassName = 'disable';
      break;
    case EStatusType.pending:
      badgeTypeClassName = 'pending';
      break;
    default:
      break;
  }
  
  return (
    <div className={classNames(s.badge, s[badgeTypeClassName])}>
      {status}
    </div>
  )
}

export default StatusBadge;