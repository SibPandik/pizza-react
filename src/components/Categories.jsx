import React from 'react';

function Categories({value, onClickCategory}) {
  //const [activeIndex, setActiveIndex] = React.useState(2);

  const categories = ['Всё', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i}
          onClick={() => onClickCategory(i)} 
          className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
