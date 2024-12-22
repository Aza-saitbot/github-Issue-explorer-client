import './Header.scss'
import {GithubIcon} from '@src/assets/icons/Github.icon';
import {Link} from 'react-router-dom';
const Header = () => {
  return (
    <div className={'header'}>
      <GithubIcon className={'header__icon'}/>
      <span>Github Issue Explorer</span>
      <Link to={'/statistics'}>Статистика</Link>
    </div>
  );
};

export default Header;