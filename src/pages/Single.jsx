import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import Tags from '../components/Tags';

import { fetchCurrentMeal, setCurrentMeal, fetchRemoveMeal, fetchRemoveFavorite, fetchAddFavorite } from '../redux/actions/meal';

const Single = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const [youtubePreview, setYoutubePreview] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const isLoading = useSelector(({ meal }) => meal.isLoading);
  const currentMeal = useSelector(({ meal }) => meal.currentMeal);
  const currentUser = useSelector(({ user }) => user.currentUser);
  const favorites = useSelector(({ meal }) => meal.favorites);
  const token = useSelector(({ user }) => user.token);

  useEffect(() => {
    dispatch(fetchCurrentMeal(id));
    return () => dispatch(setCurrentMeal(null));
  }, [dispatch, id])

  useEffect(() => {
    const parsed = currentMeal && currentMeal.youtube && queryString.parse(currentMeal.youtube.replace('https://www.youtube.com/watch', '')).v;
    const preview = `https://img.youtube.com/vi/${parsed}/hqdefault.jpg`;
    parsed && setYoutubePreview(preview);
  }, [currentMeal])

  useEffect(() => {
    currentMeal && favorites && favorites.forEach(favorite => favorite.meal._id === currentMeal._id ? setIsFavorite(true) : setIsFavorite(false));
  }, [currentMeal, favorites])

  const onRemove = () => {
    if(window.confirm('Вы действительно хотите удалить рецепт?')) {
      dispatch(fetchRemoveMeal(id));
      history.push('/own');
    }
  }

  const handleFavorite = () => {
    if(isFavorite) {
      if(window.confirm('Вы действительно хотите удалить рецепт из избранного?')) {
        const favoriteId = favorites.find(favorite => favorite.meal._id === id)._id;
        dispatch(fetchRemoveFavorite(favoriteId));
      }
    } else {
      if(window.confirm('Вы действительно хотите добавить рецепт в избранное?')) {
        dispatch(fetchAddFavorite(id, token));
      }
    }
  }

  // TODO сделать редактирование рецепта
  // TODO провалидировать добавление рецепта + сделать добавление картинки

  return (
    <section className="single">
      <div className="single__container container">
        {(currentMeal && !isLoading) ? (
          <>
            <header className="single__header">
              <h2 className="single__title title">{currentMeal.name}</h2>
              {currentUser && currentMeal.user && currentUser.id === currentMeal.user.id
                ? (
                  <div className="single__actions">
                    <button className="single__edit btn">Редактировать</button>
                    <button onClick={onRemove} className="single__remove btn">Удалить</button>
                  </div>
                ) : currentMeal.user && `Автор: ${currentMeal.user.login}`}
            </header>

            <div className="single__img">
              <img src={currentMeal.img} alt={currentMeal.name} />
            </div>

            {currentUser && (currentUser.id !== currentMeal.user.id) && (
              <button onClick={handleFavorite} className="single__favorites btn">
                {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              </button>
            )}

            <p className="single__info">{currentMeal.category}, {currentMeal.area}</p>
            {currentMeal.tags && <Tags tags={currentMeal.tags} classes="single__tags" />}

            <div className="single__instructions">
              {currentMeal.instructions.map((text, index) => <p key={index}>{text}</p>)}
            </div>

            <h3 className="single__caption">Ингредиенты и меры:</h3>
            <ul className="single__ingredients list">
              {currentMeal.ingredients.map((ingredient, index) => (
                <li key={index} className="list-item">{ingredient} | {currentMeal.measures[index]}</li>
              ))}
            </ul>

            {currentMeal.youtube && (
              <>
                <h3 className="single__caption">Как готовить</h3>
                <a href={currentMeal.youtube} target="_blank" rel="noreferrer" className="single__video">
                  <img src={youtubePreview} alt="Youtube"/>
                </a>
              </>
            )}

            {currentMeal.source && (
              <p className="single__source">
                Source: <a href={currentMeal.source} target="_blank" rel="noreferrer" className="single__source-link">{currentMeal.source}</a>
              </p>
            )}
          </>
        ) : 'Загрузка...'}
      </div>
    </section>
  )
}

export default Single;