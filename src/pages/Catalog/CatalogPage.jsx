import { Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CardList } from '../../components/CardList/CardList';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { getIssues } from '../../utils/utils';
import './index.css';
import { Box } from '@mui/material';
import cn from "classnames";
import  App  from '../../components/App/App';

export const CatalogPage = () => {

  const { searchQuery, setSort } = useContext(UserContext);
  const { cards } = useContext(CardContext);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [paginatedCards, setPaginatedCards] = useState([]);
  const [optionsPage, setOptionsPage] = useState([]);

  useEffect(() => {
    const total = cards.length;
    const pages = Math.ceil(total / pageSize);
    const pageCounter = new Array(pages).fill({}).map((e, i) => ({
      value: i + 1, label: `${i + 1}`
    }));
    setOptionsPage(pageCounter);
    setPage(1);
  }, [cards, pageSize])



  useEffect(() => {
    const paginated = cards.slice(pageSize * (page - 1), pageSize * page);
    setPaginatedCards(paginated)
  }, [cards, pageSize, page]);
  
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  console.log(params);
  console.log(setSort);

  useEffect(() => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        page: page,
        pageSize: pageSize,
      }).toString()
    });
    
  }, [navigate, page, pageSize]);

  const sortedItems = [
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

  const optionsSize = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 50, label: '50' },
  ];


  const handleChange = (v) => {
    setPageSize(v)
  }

  return <>
    {searchQuery && (
      <p>
        По запросу {searchQuery} найдено {cards?.length}
        {getIssues(cards.length)}
      </p>
    )}
    <div className='sort-cards'>
      {sortedItems.map((e) =>
        <span className={cn('sort-item', {
          'sort-item_selected': cards.sort === e.id 
        })} onClick={() => setSort(e.id)}>{e.title}</span>
      )}
    </div>
    <CardList cards={paginatedCards} />
    {cards?.length > 10 &&
      <Box Box style={{
        margin: '60px',
        fontWeight: 'bold',
        color: '#43290a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
    <span>Показывать по </span>
    <Select style={{
      width: 70, margin: '10px'
    }} defaultValue={10} options={optionsSize} onChange={handleChange} className="" />
    <span style={{
      marginRight: '60px'
    }} >товаров на странице </span>
    <span >Выберите страницу</span>
    <Select style={{
      width: 70, margin: '10px'
    }} defaultValue={1} value={page} options={optionsPage} onChange={setPage} className="" />

    {/* <select></select> */}

  </Box >
}
  </> 
};
