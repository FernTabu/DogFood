import React, { useEffect, useRef, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "./App.scss";
import { api } from "../../utils/api";
import { findLike, useDebounce } from "../../utils/utils";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProductPage } from "../../pages/Product/ProductPage";
import { CatalogPage } from "../../pages/Catalog/CatalogPage";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { FaqPage } from "../../pages/FAQ/faq-page";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Favorites } from "../../pages/Favorites/Favorites";
import { Cart} from "../Cart/Cart"
import { Form } from "../Form/Form";
import { RegistrationForm } from "../Form/RegistrationForm";
import { Modal } from "../Modal/Modal";
import { Login } from "../Auth/Login/Login";
import { Register } from "../Auth/Register/Register";
import { ResetPass } from "../Auth/ResetPassword/ResetPassword";
import { parseJwt } from "../../utils/parseJWT";
import { Profile } from "../Profile/Profile";
import { Chart } from "../Chart/Chart";
import { NewProduct } from "../NewProduct/NewProduct";


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  


  const filteredCards = (products, id) => {
    return products;
    // console.log({products, id});
    // return products.filter((e) => e.author._id === id);
  };
  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filteredCards(data, currentUser._id)));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);
  // функция по нажатию / отжатию лайка
  function handleProductLike(product) {
    // понимаем , отлайкан ли продукт был
    const isLiked = findLike(product, currentUser);
    isLiked
      ? // Если товар был с лайком, значит было действие по удалению лайка
      api.deleteLike(product._id).then((newCard) => {
        // newCard - карточка с уже изменненым количеством лайков
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        setCards(filteredCards(newCards, currentUser._id));
        setFavorites((state) => state.filter((f) => f._id !== newCard._id));
      })
      : // Если не отлайкан, значит действие было совершено для добавления лайка.
      api.addLike(product._id).then((newCard) => {
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        setCards(filteredCards(newCards, currentUser._id));
        setFavorites((favor) => [...favor, newCard]);
      });
      return isLiked;
  }

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  // Первоначальная загрузка карточек/продуктов/постов/сущностей и данных юзера
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        // сеттим юзера
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        // сеттим карточки
        setCards(items);
        // получаем отлайканные нами карточки
        const fav = items.filter((e) => findLike(e, userData));
        // сеттим карточки в избранный стейт
        setFavorites(fav);
      }
    );
  }, [isAuthentificated]);

  const setSortCards = (sort) => {
    if (sort === "cheap") {
      const newCards = cards.sort((a, b) => (a.price - a.discount / 100 * a.price) - (b.price - b.discount / 100 * b.price));
      setCards([...newCards]);
    }
    if (sort === "expensive") {
      const newCards = cards.sort((a, b) => (b.price - b.discount / 100 * b.price) - (a.price - a.discount / 100 * a.price));
      setCards([...newCards]);
    }
    if (sort === "popular") {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
    if (sort === "sale") {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards]);
    }
    if (sort === "new") {
      const newCards = cards.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setCards([...newCards]);
    }
  };

  const contextValue = {
    setSort: setSortCards,
    currentUser,
    setCurrentUser,
    searchQuery,
    setSearchQuery,
    setParentCounter,
    parentCounter,
    isAuthentificated,

  };
  const contextCardValue = {
    cards: cards,
    setParentCounter,
    handleProductLike,
    favorites,
    setFavorites,
  };

  const navigate = useNavigate();

  useEffect(() => {
    // const authPath = ['/reset-password', '/register']
    const token = localStorage.getItem('token')
    const uncodedToken = parseJwt(token);
    if (uncodedToken?._id) {
      setIsAuthentificated(true)
    }
    // else if (!authPath.includes(location.pathname)) {
    //   navigate('/login');
    // }
  }, [navigate]);

  const authRoutes = <> <Route
    path="login"
    element={
      <Modal activeModal={activeModal} setShowModal={setShowModal}>
        <Login setShowModal={setShowModal} />
      </Modal>
    }
  ></Route>
    <Route
      path="register"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <Register setShowModal={setShowModal} />
        </Modal>
      }
    ></Route>
    <Route
      path="reset-password"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <ResetPass setShowModal={setShowModal} />
        </Modal>
      }
    ></Route></>

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal} />
          {isAuthentificated ?
            <main className="content container">
              <Routes>
                <Route path="/" element={<CatalogPage />}>
                  {/* <Route path="/:page" element={<CatalogPage />}></Route> */}
                </Route>
                <Route
                  path="product/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route
                  path="fakeRout/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route path="faq" element={<FaqPage />}></Route>
                <Route path="favorites" element={<Favorites />}></Route>
                <Route path="cart" element={<Cart />}></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="newproduct" element={<NewProduct />}></Route>
                <Route path="chart" element={<Chart />}></Route>
                {authRoutes}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </main>
            :
            <div className="not__auth">Пожалуйста, авторизуйтесь
              <Routes>
                {authRoutes}
              </Routes>
            </div>
          }
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
// useEffect - для побочных действий
// useEffect(()=>{}) - update на каждое изменение компонента.
// useEffect(()=>{},[state]) - update на каждое изменение конкретного state.
// useEffect(()=>{},[]) - update в самом начале

// Чистая функция - это функция , которая при одних и тех же входных параметрах возвращает одинаковый результат.

// <BrowserRouter>
//  <Routes>
//   <Route path="/" element={<Dashboard />}>
//   <Route path="product" element={<AboutPage />} />
// </Routes>
// </BrowserRouter>
// Asdfgk1236
