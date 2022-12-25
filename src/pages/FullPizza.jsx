import axios from 'axios'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza = () => {
    const [pizza, setPizza] = React.useState();
    const { id } = useParams();
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://6381e85d53081dd5498b0e4f.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Такой пиццы нет')
                navigate('/')
            }    
        }
        fetchPizza();
    }, []);

    if (!pizza) {
        return 'Загрузка...'
    }

  return (
    <div className='container'>
        <img src={pizza.imageUrl}/>
        <h1>{ pizza.title }</h1>
        <h4>{ pizza.price }</h4>
    </div>
  )
}

export default FullPizza