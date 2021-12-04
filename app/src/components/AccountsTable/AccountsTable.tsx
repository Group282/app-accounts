import s from './AccountsTable.module.scss';
import IAccountsTableProps, { IAccount, EStatusType } from "../../types/AccountsTable.props";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge';

const AccountsTable = ({ accounts }: IAccountsTableProps ):JSX.Element => {

  return (
    <table className={ s.accountsTable }>
      <thead>
        <tr>
          <th>Name</th>
          <th>Account name</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Start date</th>
          <th>Expiration date</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          accounts.map((acc) => (
            <tr key={ acc.id }>
              <td className={s.link}><Link to={`/profile/${acc.id}`}>{acc.name}</Link></td>
              <td>{acc.account_name}</td>
              <td>{acc.email}</td>
              <td>{<StatusBadge status={acc.status}/>}</td>
              <td>{new Date(Number(acc.start_date)).toLocaleDateString('uk')}</td>
              <td>{new Date(Number(acc.expiration_date)).toLocaleDateString('uk')}</td>
              <td className={s.tr}><Link to={`accounts/edit/${acc.id}`} className="btn edit">Edit</Link></td>
              <td className={s.tl}><Link to={`accounts/delete/${acc.id}`} className="btn delete">Delete</Link></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default AccountsTable;