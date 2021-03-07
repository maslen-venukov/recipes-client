import React from 'react';

const EditorIngredients = ({ items, measures, onRemove, openModal }) => {
  return (
    <div className="editor__ingredients">
      <h3 className="editor__caption">Ингредиенты и меры</h3>
      <ul className="editor__ingredients-list">
        {items.length > 0
          ? items.map((item, index) => (
            <li key={Math.random() * Date.now()} className="editor__ingredients-item">
              <p className="editor__ingredients-text">{item} — {measures[index]}</p>
              <button onClick={() => onRemove(index)} type="button" className="editor__ingredients-remove cross" />
            </li>
          ))
          : 'Список ингредиентов пуст'
        }
      </ul>
      <button data-open-modal onClick={openModal} type="button" className="editor__ingredients-add btn" />
    </div>
  )
}

export default EditorIngredients;