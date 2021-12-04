import { useEffect, useState } from 'react';
import AccountsTable from '../../components/AccountsTable';
import MessageBox from '../../components/MessageBox';
import Navbar from '../../components/Navbar';
import { IAccount } from '../../types/AccountsTable.props';
import { EMessageType } from '../../types/MessageBox.props';
import { ENavbarLinks } from '../../types/Navbar.props';
import s from './AccountsPage.module.scss';

const accountsListUrl = process.env.REACT_APP_ACCOUNTS_LIST_URL || 'localhost';

const AccountsPage = ():JSX.Element => {
  const[error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);
  
  useEffect(() => {
    console.log(accountsListUrl)
    fetch(accountsListUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAccounts(result.sort((a: IAccount, b: IAccount) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }

            return 0;
          }));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  return (
    <div>
      <Navbar active={ENavbarLinks.accounts} />
      <div className="container">
        <header className={s.header}>
          <h1>Accouts list</h1>
          <button className="create">Create account</button>
        </header>
        {error && <MessageBox type={EMessageType.error} message={error} />}
        <MessageBox message={`Total: ${accounts.length}`} />
        {isLoaded && <AccountsTable accounts={accounts} />}
      </div>
    </div>
  )
}

export default AccountsPage;