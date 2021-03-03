import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NewLabel from '../components/NewLabel';

import { fetchCreateMeal } from '../actions/own';

const New = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token = useSelector(({ user }) => user.token);

  const initialForm = {
    img: '',
    name: '',
    area: '',
    category: '',
    tags: '',
    ingredients: [],
    measures: [],
    instructions: [],
    youtube: '',
    source: ''
  }

  const [form, setForm] = useState(initialForm);
  const [modal, setModal] = useState(null);

  const onInputChange = e => setForm({ ...form, [e.target.name]: e.target.value});

  const onTagsChange = e => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setForm({ ...form, tags });
  }

  const onAddIngredient = e => {
    e.preventDefault();

    const elements = Array.from(e.target.elements);
    const inputs = elements.filter(item => item.tagName === 'INPUT');

    const newForm = {
      ...form,
      ingredients: [...form.ingredients, inputs[0].value.trim()],
      measures: [...form.measures, inputs[1].value.trim()]
    }

    setForm(newForm);
    setModal(null);
  }

  const onRemoveIngredient = index => {
    const newForm = {
      ...form,
      ingredients: form.ingredients.filter((_, i) => i !== index),
      measures: form.measures.filter((_, i) => i !== index)
    }
    setForm(newForm);
  }

  const onAddInstruction = e => {
    e.preventDefault();

    const elements = Array.from(e.target.elements);
    const textarea = elements.filter(item => item.tagName === 'TEXTAREA')[0];

    const newForm = {
      ...form,
      instructions: [...form.instructions, textarea.value.trim()]
    }

    setForm(newForm);
    setModal(null);
  }

  const onRemoveInstruction = index => {
    const newForm = {
      ...form,
      instructions: form.instructions.filter((_, i) => i !== index),
    }
    setForm(newForm);
  }

  const onCreate = e => {
    e.preventDefault();
    dispatch(fetchCreateMeal(form, token));
    setForm(initialForm);
    history.push('/own');
  }

  const onOverlayClick = e => {
    const onOpenBtnClick = e.target.closest('[data-open-modal]');
    const onInsideClick = e.target.closest('.modal__form');
    const onCloseBtnClick = e.target.closest('.modal__close');
    ((!onOpenBtnClick && !onInsideClick) || onCloseBtnClick) && setModal(null);
  }

  useEffect(() => {
    document.body.addEventListener('click', onOverlayClick);
    return () => document.body.removeEventListener('click', onOverlayClick);
  }, []);

  const labels = [
    { title: 'URL изображения', isRequired: true, onChange: onInputChange, value: form.img, name: 'img' },
    { title: 'Название', isRequired: true, onChange: onInputChange, value: form.name, name: 'name' },
    { title: 'Происхождение', isRequired: true, onChange: onInputChange, value: form.area, name: 'area' },
    { title: 'Категория', isRequired: true, onChange: onInputChange, value: form.category, name: 'category' },
    { title: 'Теги через запятую', onChange: onTagsChange, value: form.tags, name: 'tags' }
  ]

  return (
    <section className="new">
      <div className="new__container container">
        <h1 className="new__title title">Ваш новый рецепт</h1>
        <form onSubmit={onCreate} className="new__form">
          {labels.map(label => <NewLabel key={label.name} {...label} />)}

          <div className="new__ingredients">
            <h2 className="new__caption">Ингредиенты и меры</h2>
            <ul className="new__ingredients-list">
              {form.ingredients.length > 0
                ? form.ingredients.map((ingredient, index) => (
                  <li key={`${ingredient}_${form.measures[index]}`} className="new__ingredients-item">
                    <p className="new__ingredients-text">{ingredient} — {form.measures[index]}</p>
                    <button onClick={() => onRemoveIngredient(index)} type="button" className="new__ingredients-remove cross" />
                  </li>
                ))
                : 'Список ингредиентов пуст'
              }
            </ul>
            <button data-open-modal onClick={() => setModal('ingredients')} type="button" className="new__ingredients-add btn" />
          </div>

          <div className="new__instructions">
            <h2 className="new__caption">Шаги</h2>
            <ol className="new__instructions-list">
              {form.instructions.map((instruction, index) => (
                <li key={instruction} className="new__instructions-item">
                  <p className="new__instructions-text">{instruction}</p>
                  <button onClick={() => onRemoveInstruction(index)} type="button" className="new__ingredients-remove cross" />
                </li>
              ))}
            </ol>
            <button data-open-modal onClick={() => setModal('instructions')} type="button" className="new__instructions-add btn" />
          </div>

          <NewLabel title="Ссылка на Youtube" onChange={onInputChange} value={form.youtube} name="youtube" />
          <NewLabel title="Источник" onChange={onInputChange} value={form.source} name="source" />

          <button className="new__create btn">Добавить</button>
        </form>
      </div>

      {modal === 'ingredients' && (
        <div className="modal">
          <form onSubmit={onAddIngredient} className="modal__form">
            <button type="button" className="modal__close cross" />
            <h2 className="modal__title">Введите название ингредиента и меру</h2>
            <input type="text" placeholder="Ингредиент" required className="modal__input input" />
            <input type="text" placeholder="Мера" required className="modal__input input" />
            <button className="modal__btn btn">Добавить</button>
          </form>
        </div>
      )}

      {modal === 'instructions' && (
        <div className="modal">
          <form onSubmit={onAddInstruction} className="modal__form">
            <button type="button" className="modal__close cross" />
            <h2 className="modal__title">Введите описание</h2>
            <textarea className="modal__textarea input" />
            <button className="modal__btn btn">Добавить</button>
          </form>
        </div>
      )}
    </section>
  )
}

export default New;