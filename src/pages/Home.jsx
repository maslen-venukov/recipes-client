import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import Circle from '../components/Circle';

import { fetchRandom } from '../actions/meal';
import { fetchLast } from '../actions/last';

const Home = () => {
  const dispatch = useDispatch();

  const [scrollBtnVisible, setScrollBtnVisible] = useState(false);

  const isLoading = useSelector(({ meal }) => meal.isLoading);
  const random = useSelector(({ meal }) => meal.random);
  const last = useSelector(({ meal }) => meal.last);

  const onLoad = useCallback(() => {
    dispatch(fetchRandom());
    dispatch(fetchRandom());
    dispatch(fetchRandom());
  }, [dispatch])

  const loadOnScroll = useCallback(() => {
    const scroll = window.pageYOffset + document.documentElement.clientHeight;
    const ratio = scroll / document.documentElement.scrollHeight;
    +ratio.toFixed(2) === 0.95 && onLoad();
  }, [onLoad])

  const checkPageScroll = useCallback(() => {
    window.pageYOffset > document.documentElement.clientHeight
      ? setScrollBtnVisible(true)
      : setScrollBtnVisible(false);
  }, [])

  const handleScroll = useCallback(() => {
    loadOnScroll();
    checkPageScroll();
  }, [loadOnScroll, checkPageScroll])

  const onScrollUp = () => window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(fetchLast());
    onLoad();
  }, [dispatch, onLoad])

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll])

  return (
    <section className="home">
      <div className="home__container container">

        {last && last.length > 0 && (
          <div className="home__last last">
            <h2 className="last__title">Последние рецепты</h2>
            <ul className="last__list">
              {last.map(meal => (
                <li key={meal._id} className="last__item">
                  <Link to={`/meal/${meal._id}`} className="last__link">
                    <Circle img={meal.img} name={meal.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="home__random random">
          <ul className="random__list">
            {random && random.map((card, index) => (
              <li key={`${card.id}_${index}`} className="random__item">
                <Card {...card} />
              </li>
            ))}
          </ul>
          {isLoading && 'Загрузка...'}
        </div>

      </div>
      {scrollBtnVisible && <button onClick={onScrollUp} className="home__up" />}
    </section>
  )
}

export default Home;