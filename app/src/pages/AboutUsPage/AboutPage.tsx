import Navbar from '../../components/Navbar';
import { ENavbarLinks } from '../../types/Navbar.props';
import s from './AboutPage.module.scss';

const AboutPage = ():JSX.Element => {
  return (
    <div>
      <Navbar active={ENavbarLinks.aboutUs} />
      About Us
    </div>
  )
}

export default AboutPage;