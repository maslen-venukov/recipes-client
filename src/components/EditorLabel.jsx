import React from 'react';

const EditorLabel = ({ title, isRequired, onChange, value, name }) => {
  return (
    <label className="editor__label">
      <p className="editor__label-title">{title}{isRequired && <em>*</em>}</p>
      <input onChange={onChange} value={value} type="text" name={name} required={isRequired} className="editor__input input" />
    </label>
  )
}

export default EditorLabel;