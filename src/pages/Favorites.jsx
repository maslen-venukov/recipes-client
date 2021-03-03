import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Cell from '../components/Cell';

const Favorites = () => {
  const favorites = useSelector(({ meal }) => meal.favorites);
  return (
    <section className="favorites">
      <div className="favorites__container container">
        <header className="favorites__header">
          <h2 className="favorites__title title">Избранное</h2>
        </header>
        {favorites
          ? favorites.length > 0
            ? <ul className="favorites__list">
              {favorites.map(favorite => (
                <li key={favorite._id} className="favorites__item">
                  <Link to={`/meals/${favorite.meal._id}`} className="favorites__link">
                    <Cell img={favorite.meal.img} name={favorite.meal.name} />
                  </Link>
                </li>
              ))}
            </ul>
            : 'Список рецептов пуст'
          : 'Загрузка...'}
      </div>
    </section>
  )
}

export default Favorites;