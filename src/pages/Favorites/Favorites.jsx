import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardList } from "../../components/CardList/CardList";
import { CardContext } from "../../context/cardContext";
import "./index.scss";
import { ContentHeader } from "../../components/ContentHeader/content-header";

export const Favorites = () => {
  const { favorites } = useContext(CardContext);

  const navigate = useNavigate();

  return (
    <div className="favorites">
      <ContentHeader >
      <h1>Избранное</h1>
      {!!favorites.length ? (
        <CardList cards={favorites} />
      ) : (
        <div className="not-found">Вы не добавили еще ни одного товара</div>
        )}
      </ContentHeader>
    </div>
  );
};
