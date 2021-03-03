import React from 'react';

const Circle = ({ img, name }) => {
  return (
    <article className="circle">
      <img src={img} alt={name}/>
    </article>
  )
}

export default Circle;