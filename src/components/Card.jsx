import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Tags from './Tags';

const Card = ({ id, img, name, category, area, tags, instructions, ingredients, measures, youtube, source }) => {
  const user = useSelector(({ user }) => user.currentUser);

  return (
    <article className="card">
      <Link to={`/meal/${id}`} className="card__img">
        <img src={img} alt={name}/>
      </Link>
      <div className="card__body">
        <h2 className="card__title">
          <Link to={`/meal/${id}`}>{name}</Link>
          {user && (
            <button className="card__like">
              <svg viewBox="0 0 512 452" xmlns="http://www.w3.org/2000/svg">
                <path d="M242.841 86.6363L256 110.684L269.159 86.6367C277.03 72.2521 290.16 52.9674 309.47 38.0335L300.367 26.2639L309.47 38.0335C329.355 22.6542 351.615 15 376 15C444.123 15 497 70.5303 497 147.514C497 188.327 480.822 223.304 450.177 260.282C419.152 297.719 374.467 335.864 318.914 383.205L318.914 383.205L318.905 383.213C300.151 399.195 278.83 417.365 256.657 436.756L256.652 436.76C256.482 436.909 256.255 437 256 437C255.745 437 255.519 436.91 255.35 436.761L255.342 436.754C233.185 417.378 211.875 399.218 193.141 383.252L193.098 383.215L193.098 383.215C137.539 335.869 92.8505 297.721 61.8241 260.283C31.1779 223.304 15 188.327 15 147.514C15 70.5303 67.8766 15 136 15C160.385 15 182.645 22.6542 202.53 38.0335L211.633 26.2639L202.53 38.0335C221.84 52.9675 234.97 72.2513 242.841 86.6363Z" strokeWidth="30" />
              </svg>
            </button>
          )}
        </h2>
        <p className="card__info">{category}, {area}</p>
        {tags && <Tags tags={tags} classes="card__tags" />}
      </div>
    </article>
  )
}

export default Card;