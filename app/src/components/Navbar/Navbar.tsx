import { Link } from "react-router-dom";

import s from './Navbar.module.scss';
import INavbarProps, { ENavbarLinks } from "../../types/Navbar.props";

const Navbar = ({ active }: INavbarProps ):JSX.Element => {
  return (
    <nav className={s.navbar}>
      <div className={s.logo}>
        WEB 22
      </div>
      <ul className={s.links}>
        <li className={active === ENavbarLinks.accounts? s.active : ""}><Link to="/accounts">Accounts</Link></li>
        <li className={active === ENavbarLinks.aboutUs ? s.active : ""}><Link to="/about">AboutUs</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;