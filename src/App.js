import './scss/app.scss';
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import Categories from './components/Categories';


function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              <PizzaBlock title="Мексиканская" price="500"/>
              <PizzaBlock title="Классическая" price="350"/>
              <PizzaBlock title="С грибами" price="400"/>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
