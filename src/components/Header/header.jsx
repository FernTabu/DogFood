import s from './index.module.css';
import cn from 'classnames';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import React, { useContext } from "react";
import { UserContext } from './../../context/userContext';
import { ThemeContext } from "../../context/themeContext";

const Header = ({ children, user, onUpdateUser }) => {
  const currentUser = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const { favorites } = useContext(CardContext);

  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    theme.toggleTheme();
    onUpdateUser(currentUser.user.name = 'Ольга', currentUser.user.about = ' !Студент! ')
  }

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{ pathname: "/favorites", state: 'sfsdfsdf' }}>
              <FavoriteIcon />
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>
          </div>
          <div className={s.profile}>
            {currentUser.user?.avatar && <image src={currentUser.user.avatar}></image>}
            {currentUser.user?.email && <span>{currentUser.user.email}</span>}
            {currentUser.user?.name && <span>{currentUser.user.name}: {currentUser.user.about}</span>}
            <button onClick={handleClickButtonEdit} className="btn_type_secondary">
              Изменить
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;