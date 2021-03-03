import React from 'react';

const Cell = ({ img, name }) => {
  return (
    <article className="cell">
      <div className="cell__thumb">
        <img src={img} alt={name} />
      </div>
      <h2 className="cell__name">{name}</h2>
    </article>
  )
}

export default Cell;