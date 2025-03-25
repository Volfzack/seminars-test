import React from 'react';

const SeminarList = ({ seminars, onDeleteSeminar, onEditSeminar }) => {
    console.log(seminars);
  return (
    <ul className='lecture-list'>
      {seminars.map(seminar => (
        <li key={seminar.id}>
          <h3 className='lecture-title'>{seminar.title}</h3>
          <p className='lecture-description'>{seminar.description}</p>
          <p className='lecture-date'>Дата: {seminar.date}, Время: {seminar.time}</p>
          <img src={seminar.photo} />
          <div>
          <button className='delete-btn' onClick={() => onDeleteSeminar(seminar.id)}>Удалить</button>
          <button onClick={() => onEditSeminar(seminar)}>Редактировать</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SeminarList;