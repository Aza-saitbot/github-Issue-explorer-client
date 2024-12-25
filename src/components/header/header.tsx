import './Header.scss'
import {GithubIcon} from '@src/assets/icons/Github.icon';
import {Link} from 'react-router-dom';
const Header = () => {
  const listLinks = [{title: 'Github Issue Explorer', link: '/'}, {title: 'Statistics', link: '/statistics'}]
  return (
    <div className={'header'}>
      <GithubIcon className={'header__icon'}/>
      <div className={'header__links'}>
        {listLinks.map(({link, title}) => <Link key={title} to={link}>
          {title}
        </Link>)}
      </div>
    </div>
  );
};

export default Header;