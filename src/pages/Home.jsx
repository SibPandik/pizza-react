import React from 'react';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });


  React.useEffect(() => {
    setIsLoading(false)

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    fetch(`https://6381e85d53081dd5498b0e4f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(true);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          : [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
      </div>
    </div>
  );
};

export default Home;
