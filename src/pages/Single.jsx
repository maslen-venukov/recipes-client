import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import queryString from 'query-string';

import Tags from '../components/Tags';

import { fetchCurrentMeal, setCurrentMeal } from '../actions/meal';
import { fetchRemoveMeal } from '../actions/own';
import { fetchRemoveFavorite, fetchAddFavorite } from '../actions/favorites';

import url from '../apiUrl';

const Single = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const [youtubePreview, setYoutubePreview] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUser = useSelector(({ user }) => user.currentUser);
  const currentMeal = useSelector(({ meal }) => meal.currentMeal);
  const isLoading = useSelector(({ meal }) => meal.isLoading);
  const favorites = useSelector(({ favorites }) => favorites);
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
    const isFinded = favorites && !!favorites.find(favorite => favorite.meal._id === id);
    setIsFavorite(isFinded);
  }, [favorites, id])

  useEffect(() => {
    const src = currentMeal && (!currentMeal.img.includes('http') ? `${url}/${currentMeal.img}` : currentMeal.img);
    setImgSrc(src);
  }, [currentMeal])

  const onRemove = () => {
    if(window.confirm('Вы действительно хотите удалить рецепт?')) {
      dispatch(fetchRemoveMeal(id, token));
      history.push('/own');
    }
  }

  const handleFavorite = () => {
    switch (isFavorite) {
      case true:
        if(window.confirm('Вы действительно хотите удалить рецепт из избранного?')) {
          const favoriteId = favorites.find(favorite => favorite.meal._id === id)._id;
          dispatch(fetchRemoveFavorite(favoriteId, token));
        }
        break;

      case false:
        if(window.confirm('Вы действительно хотите добавить рецепт в избранное?')) {
          dispatch(fetchAddFavorite(id, token));
        }
        break;

      default:
        break;
    }
  }

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
                    <Link to={`/edit/${id}`} className="single__edit btn">Редактировать</Link>
                    <button onClick={onRemove} className="single__remove btn">Удалить</button>
                  </div>
                ) : currentMeal.user && `Автор: ${currentMeal.user.login}`}
            </header>

            <div className="single__img">
              <img src={imgSrc} alt={currentMeal.name} />
            </div>

            {currentUser && currentMeal.user && currentUser.id !== currentMeal.user.id && (
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
                Источник: <a href={currentMeal.source} target="_blank" rel="noreferrer" className="single__source-link">{currentMeal.source}</a>
              </p>
            )}
          </>
        ) : 'Загрузка...'}
      </div>
    </section>
  )
}

export default Single;