import React from 'react';

const SeminarModal = ({ isOpen, onClose, seminar, onSave, onDeleteConfirm }) => {
  if (!isOpen) {
    return null;
  }

  const handleSave = (e) => {
    e.preventDefault();
    // Здесь будет логика сохранения изменений
    onSave({
      id: seminar.id, 
      title: e.target.title.value,
      description: e.target.description.value,
      date: e.target.date.value,
      time: e.target.time.value,
      photo: e.target.photo.value,
    });
    onClose();
  };

  const handleDeleteConfirm = () => {
    onDeleteConfirm(seminar.id);
    onClose();
  };


  if (seminar && seminar.mode === 'edit') { // Режим редактирования
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Редактировать семинар</h2>
          <form className='modal-form' onSubmit={handleSave}>
            <div className='modal-title'>
              <label htmlFor="title">Название:</label>
              <input type="text" id="title" name="title" defaultValue={seminar.title} required />
            </div>
            <div className='modal-description'>
              <label htmlFor="description">Описание:</label>
              <textarea id="description" name="description" defaultValue={seminar.description} required />
            </div>
            <div className='modal-date'>
              <label htmlFor="date">Дата:</label>
              <input type="date" id="date" name="date" defaultValue={seminar.date} required />
            </div>
            <div className='modal-time'>
              <label htmlFor="time">Время:</label>
              <input type="time" id="time" name="time" defaultValue={seminar.time} required />
            </div>
            <div className='modal-photo'>
              <label htmlFor="photo">URL фото:</label>
              <input type="url" id="photo" name="photo" defaultValue={seminar.photo} />
            </div>
            <button type="submit">Сохранить</button>
          </form>
        </div>
      </div>
    );
  } else if (seminar && seminar.mode === 'deleteConfirm') { // Режим подтверждения удаления
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Подтверждение удаления</h2>
          <p>Вы уверены, что хотите удалить семинар?</p>
          <button className='delete-btn' onClick={handleDeleteConfirm}>Удалить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    );
  } else {
    return null; // Модальное окно не открыто или режим не определен
  }
};

export default SeminarModal;
