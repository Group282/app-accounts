export enum EStatusType {
  active,
  pending,
  disable,
}

export interface IAccount {
  id: number;
  name: string;
  account_name: string;
  email: string;
  status: EStatusType;
  start_date: number;
  expiration_date: number;
}

interface IAccountsTableProps {
  accounts: IAccount[],
}

export default IAccountsTableProps;