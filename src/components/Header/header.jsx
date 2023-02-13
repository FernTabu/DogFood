import s from './index.module.css';
import cn from 'classnames';


function Header({ children, user, onUpdateUser }) {

  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({ name: 'Ольга', about: 'студент' })
  }

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        {user?.email && <span className={s.email}>{user?.email}</span>}
        {user?.name && <span className={s.email}>{user?.name}</span>}
        <button className={s.btn} onClick={handleClickButtonEdit}>Изменить</button>

        <div className={s.wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
