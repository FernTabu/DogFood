import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import { ContentHeader } from "../../components/ContentHeader/content-header";
import Sort from "../../components/Sort/sort"
import { CardContext } from "../../context/cardContext";
import './index.css';


export const FavoritePage = () => {
    const { favorites } = useContext(CardContext);
    return (
        <>
            <ContentHeader className='favor' title="Избранное"/>
            <Sort />
            <div className='content__cards'>
                <CardList cards={favorites}/>
            </div>
        </>
    )
}