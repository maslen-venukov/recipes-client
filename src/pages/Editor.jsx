import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import EditorLabel from '../components/EditorLabel';
import EditorImg from '../components/EditorImg';
import EditorIngredients from '../components/EditorIngredients';
import EditorInstructions from '../components/EditorInstructions';

import { setCurrentMeal } from '../actions/meal';
import { fetchCreateMeal, fetchUpdateMeal } from '../actions/own';

const Editor = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const own = useSelector(({ own }) => own);
  const token = useSelector(({ user }) => user.token);

  const modalFieldRef = useRef();

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
  const [isEditPage, setEditPage] = useState(false);
  const [imgType, setImgType] = useState('url');

  const onInputChange = e => setForm({ ...form, [e.target.name]: e.target.value});

  const onImgTypeChange = e => {
    setImgType(e.target.dataset.imgType);
    form.img !== '' && setForm({ ...form, img: '' }); 
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

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append('ingredients', JSON.stringify(form.ingredients));
    formData.append('measures', JSON.stringify(form.measures));
    formData.append('instructions', JSON.stringify(form.instructions));

    const goToOwnPage = () => {
      history.push('/own');
      setForm(initialForm);
    }

    isEditPage
      ? dispatch(fetchUpdateMeal(id, formData, token, goToOwnPage))
      : dispatch(fetchCreateMeal(formData, token, goToOwnPage));
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

  useEffect(() => {
    setEditPage(history.location.pathname.includes('edit'));
    const meal = isEditPage && own && own.find(meal => meal._id === id);
    meal
      && dispatch(setCurrentMeal(meal))
      && setForm({
        ...meal,
        tags: meal.tags ? meal.tags.join(', ') : '',
        youtube: meal.youtube || '',
        source: meal.source || ''
      })
    return () => dispatch(setCurrentMeal(null));
  }, [history.location.pathname, isEditPage, id, own, dispatch])

  useEffect(() => {
    modalFieldRef.current && modalFieldRef.current.focus();
  }, [modal])

  const labels = [
    { title: 'Название', isRequired: true, onChange: onInputChange, value: form.name, name: 'name' },
    { title: 'Происхождение', isRequired: true, onChange: onInputChange, value: form.area, name: 'area' },
    { title: 'Категория', isRequired: true, onChange: onInputChange, value: form.category, name: 'category' },
    { title: 'Теги через запятую', onChange: onInputChange, value: form.tags, name: 'tags' }
  ]

  return (
    <section className="editor">
      <div className="editor__container container">
        <h2 className="editor__title title">Ваш новый рецепт</h2>
        <form onSubmit={handleSubmit} className="editor__form">
          <EditorImg
            onImgTypeChange={onImgTypeChange}
            imgType={imgType}
            onInputChange={onInputChange}
            inputValue={form.img}
          />

          {labels.map(label => <EditorLabel key={label.name} {...label} />)}

          <EditorIngredients
            items={form.ingredients}
            measures={form.measures}
            onRemove={onRemoveIngredient}
            openModal={() => setModal('ingredients')}
          />

          <EditorInstructions
            items={form.instructions}
            onRemove={onRemoveInstruction}
            openModal={() => setModal('instructions')}
          />

          <EditorLabel title="Ссылка на Youtube" onChange={onInputChange} value={form.youtube} name="youtube" />
          <EditorLabel title="Источник" onChange={onInputChange} value={form.source} name="source" />

          <button className="editor__create btn">{isEditPage ? 'Сохранить' : 'Добавить'}</button>
        </form>
      </div>

      {modal === 'ingredients' && (
        <div className="modal">
          <form onSubmit={onAddIngredient} className="modal__form">
            <button type="button" className="modal__close cross" />
            <h3 className="modal__title">Введите название ингредиента и меру</h3>
            <input ref={modalFieldRef} type="text" placeholder="Ингредиент" required className="modal__input input" />
            <input type="text" placeholder="Мера" required className="modal__input input" />
            <button className="modal__btn btn">Добавить</button>
          </form>
        </div>
      )}

      {modal === 'instructions' && (
        <div className="modal">
          <form onSubmit={onAddInstruction} className="modal__form">
            <button type="button" className="modal__close cross" />
            <h3 className="modal__title">Введите описание</h3>
            <textarea ref={modalFieldRef} required className="modal__textarea input" />
            <button className="modal__btn btn">Добавить</button>
          </form>
        </div>
      )}
    </section>
  )
}

export default Editor;