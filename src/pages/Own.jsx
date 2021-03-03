import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Cell from '../components/Cell';

const Own = () => {
  const own = useSelector(({ own }) => own);

  return (
    <section className="own">
      <div className="own__container container">
        <header className="own__header">
          <h2 className="own__title title">Мои рецепты</h2>
          <Link to="/new" className="own__add btn">Добавить новый рецепт</Link>
        </header>
          {own
            ? own.length > 0
              ? <ul className="own__list">
                {own.map(meal => (
                  <li key={meal._id} className="own__item">
                    <Link to={`/meal/${meal._id}`} className="own__link">
                      <Cell img={meal.img} name={meal.name} />
                    </Link>
                  </li>
                ))}
              </ul>
              : 'Список ваших рецептов пуст'
            : 'Загрузка...'}
      </div>
    </section>
  )
}

export default Own;