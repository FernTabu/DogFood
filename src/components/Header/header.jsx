import React, { useContext, useEffect, useState } from "react";
import { Logo } from "../Logo/Logo";
import { Search } from "../Search/Search";
import "./style.css";

import IconBasket from "./basketMaterial/BasketMaterial";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Like } from "../Card/like.svg";
import { ReactComponent as LoginIcon } from "./images/login.svg";



export const Header = ({ setShowModal }) => {
  const { currentUser, searchQuery, setSearchQuery, parentCounter, isAuthentificated } =
    useContext(UserContext);
  const [counter, setCounter] = useState(parentCounter);
  const { favorites } = useContext(CardContext);

  useEffect(() => {
    setCounter((st) => st + 1);

    return () => setCounter(parentCounter);
  }, [parentCounter]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  // state.push(); deprecated!!!
  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="header__center">
            <IconBasket count={counter} />
            <Link to={"/favorites"} className="header__bubble-link">
              <Like className="header__liked" />
              {favorites.length !== 0 && (
                <span className="header__bubble">{favorites.length}</span>
              )}
            </Link>
          </div>
          <div className="header__right">
            {!isAuthentificated ? <Link to={"/login"} className="header__link" onClick={() => setShowModal(true)}>
              <LoginIcon />
            </Link> :
              <Link to={"/profile"} className="text__link" onClick={() => setShowModal(true)}>
                Личный кабинет
              </Link>
            }
            {/* <div>
            <span>{currentUser.email} </span>
            <span>{currentUser.about}</span>
          </div> */}
            <Link to={"/newproduct"} className="text__link">
              Добавить продукт
            </Link>
            <Link to={"/chart"} className="text__link1">
              Чарт
            </Link>
            <Link to={"/faq"} className="text__link">
              Мысли физиков)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
