import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner/index"
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";

const tabs = [
	{
		id: "popular",
		title: "Популярные",
	},
	{
		id: "new",
		title: "Новинки",
	},
	{
		id: "cheap",
		title: "Сначала дешёвые",
	},
	{
		id: "expensive",
		title: "Сначала дорогие",
	},
	{
		id: "sale",
		title: "По скидке",
	},

];

export const CatalogPage = () => {
	const { cards, isLoading } = useContext(CardContext);
	const { selectedTabId, setSelectedTabId } = useContext(SortContext);
	return (
		<>
			<Sort tabs={tabs}
				currentSort={selectedTabId}
				onChangeSort={(tabid) => { setSelectedTabId(tabid) }} />
			<div className='content__cards'>
				{isLoading ?<Spinner/>
					:
					<CardList cards={cards} />}
			</div>
		</>
	)
}