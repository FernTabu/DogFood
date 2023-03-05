import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import './index.css';
import { SortContext } from '../../context/sortContext';

const CardList = ({ cards }) => {
	const navigate = useNavigate();
	const { isLoading } = useContext(UserContext)
	const { selectedTabId } = useContext(SortContext);
	return (
		<>
			{!cards.length && !isLoading && <NotFound buttonText='Назад' title="Простите по вашему запросу ничего не найдено" buttonAction={() => navigate(-1)} />}
			<div className='cards'>
				{
					cards
						.sort((a, b) => {
							switch (selectedTabId) {
								case "popular":
									return b.likes.length - a.likes.length
								case "new":
									return new Date(b.created_at) - new Date(a.created_at)
								case "cheap":
									return (a.price - a.discount / 100 * a.price) - (b.price - b.discount / 100 *b.price)
								case "expensive":
									return (b.price - b.discount / 100 * b.price) - (a.price - a.discount / 100  *a.price)
								case "sale":
									return b.discount - a.discount
							}
						})
						.map((item, index) => <Card key={item._id} {...item} />)
				}
			</div>
		</>

	);
};

export default CardList;