import React from 'react';
import { Link } from 'react-router-dom';

import Tags from './Tags';

const Card = ({ id, img, name, category, area, tags }) => {
  return (
    <article className="card">
      <Link to={`/meal/${id}`} className="card__img">
        <img src={img} alt={name}/>
      </Link>
      <div className="card__body">
        <h2 className="card__title">
          <Link to={`/meal/${id}`}>{name}</Link>
        </h2>
        <p className="card__info">{category}, {area}</p>
        {tags && <Tags tags={tags} classes="card__tags" />}
      </div>
    </article>
  )
}

export default Card;