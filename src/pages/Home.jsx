import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import Circle from '../components/Circle';

import { fetchRandom, fetchLast } from '../redux/actions/meal';

const Home = () => {
  const dispatch = useDispatch();
  const anchorRef = useRef();

  const [scrollBtnVisible, setScrollBtnVisible] = useState(false);

  const isLoading = useSelector(({ meal }) => meal.isLoading);
  const random = useSelector(({ meal }) => meal.random);
  const last = useSelector(({ meal }) => meal.last);

  const onLoad = useCallback(() => {
    dispatch(fetchRandom());
    dispatch(fetchRandom());
    dispatch(fetchRandom());
  }, [dispatch])

  const onScrollUp = () => window.scrollTo(0, 0);

  const loadOnScroll = useCallback(() => {
    const scroll = window.pageYOffset + document.documentElement.clientHeight;
    const radio = scroll / document.documentElement.scrollHeight;
    radio === 1 && onLoad();
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
          <div className="last">
            <h2 className="last__title">Последние рецепты</h2>
            <ul className="last__list">
              {last.map(meal => (
                <li key={meal._id} className="last__item">
                  <Link to={`/meals/${meal._id}`} className="last__link">
                    <Circle img={meal.img} name={meal.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="random">
          <ul className="random__list">
            {random && random.map((card, index) => (
              <li key={`${card.id}_${index}`} className="random__item">
                <Card {...card} />
              </li>
            ))}
          </ul>
          {isLoading && 'Загрузка...'}
        </div>
        <div ref={anchorRef} className="home__anchor" />
      </div>
      {scrollBtnVisible && <button onClick={onScrollUp} className="home__up" />}
    </section>
  )
}

export default Home;