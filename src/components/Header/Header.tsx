import './Header.scss'
import {GithubIcon} from '@src/assets/icons/Github.icon';
const Header = () => {
  return (
    <div className={'header'}>
      <GithubIcon className={'header__icon'}/>
      <span>Github Issue Explorer</span>
    </div>
  );
};

export default Header;