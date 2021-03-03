import React from 'react';

const NewLabel = ({ title, isRequired, onChange, value, name }) => {
  return (
    <label className="new__label">
      <p className="new__label-title">{title}{isRequired && <em>*</em>}</p>
      <input onChange={onChange} value={value} type="text" name={name} required={isRequired} className="new__input input" />
    </label>
  )
}

export default NewLabel;