import React from 'react';

const Tags = ({ tags, classes }) => {
  return (
    <ul className={`${classes || ''} tags`}>
      {tags.map((tag, index) => (
        index === tags.length - 1
          ? `${tag}`
          : `${tag}, `
      ))}
    </ul>
  )
}

export default Tags;