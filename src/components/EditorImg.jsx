import React from 'react';

const EditorImg = ({ onImgTypeChange, imgType, onInputChange, inputValue }) => {
  return (
    <div className="editor__img">
      <p className="editor__img-title">Изображение<em>*</em></p>
      <button
        onClick={onImgTypeChange}
        data-img-type="url"
        type="button"
        className={`editor__img-btn editor__img-btn--url ${imgType === 'url' ? 'active' : ''} btn`}
      >
        URL
      </button>
      <button
        onClick={onImgTypeChange}
        data-img-type="file"
        type="button"
        className={`editor__img-btn editor__img-btn--file ${imgType === 'file' ? 'active' : ''} btn`}
      >
        Файл
      </button>
      {imgType === 'url'
        ? <input onChange={onInputChange} value={inputValue} type="text" name="img" required className="editor__input input" />
        : (
          <label className="editor__input input input--file">
            {inputValue.replace('C:\\fakepath\\', '') || 'Выберите файл...'}
            <input onChange={onInputChange} value={inputValue} type="file" name="img" accept="image/*" required />
          </label>
        )}
    </div>
  )
}

export default EditorImg;