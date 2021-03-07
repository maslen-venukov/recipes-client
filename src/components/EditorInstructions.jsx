import React from 'react';

const EditorInstructions = ({ items, onRemove, openModal }) => {
  return (
    <div className="editor__instructions">
      <h3 className="editor__caption">Инструкция к приготовлению</h3>
      <ol className="editor__instructions-list">
        {items.map((item, index) => (
          <li key={Math.random() * Date.now()} className="editor__instructions-item">
            <button onClick={() => onRemove(index)} type="button" className="editor__ingredients-remove cross" />
            <p className="editor__instructions-text">{item}</p>
          </li>
        ))}
      </ol>
      <button data-open-modal onClick={openModal} type="button" className="editor__instructions-add btn" />
    </div>
  )
}

export default EditorInstructions;