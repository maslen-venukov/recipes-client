import React from 'react';

import url from '../apiUrl';

const Circle = ({ img, name }) => {
  const imgUrl = img.includes('http') ? img : `${url}/${img}`;

  return (
    <article className="circle">
      <img src={imgUrl} alt={name}/>
    </article>
  )
}

export default Circle;