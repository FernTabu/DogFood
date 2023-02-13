import "./index.css";

const goods = (num) => {
	const tmp = num % 10;
	if (tmp === 1) return 'товар';
	if (tmp > 1 && tmp < 5) return 'товара';
	if (tmp > 4 || !num) return 'товаров';
}

const SeachInfo = ({ searchText, searchCount }) => {
	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} {goods(searchCount)}
		</section>
	);
};

export default SeachInfo;
