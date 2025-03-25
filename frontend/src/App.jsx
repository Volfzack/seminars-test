import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeminarList from './Components/SeminarList';
import SeminarModal from './Components/SeminarModal';
import './App.css';

function App() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState(null); // Семинар для редактирования или удаления
  const [modalMode, setModalMode] = useState(null); // 'edit', 'deleteConfirm', null

  const API_BASE_URL = 'http://localhost:4001'; // URL json-server

  useEffect(() => {
    // Запрос данных при монтировании компонента
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/seminars`);
      setSeminars(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSeminar = async (id) => {
    setEditingSeminar({ id: id, mode: 'deleteConfirm' }); // Устанавливаем режим подтверждения удаления
    setModalMode('deleteConfirm');
    setModalIsOpen(true);
  };

  const confirmDeleteSeminar = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/seminars/${id}`);
      // После успешного удаления обновляем список семинаров
      fetchSeminars();
      setModalIsOpen(false);
      setModalMode(null);
      setEditingSeminar(null);
    } catch (err) {
      setError(err); // Обработка ошибки удаления
      console.error("Ошибка удаления семинара:", err);
    }
  };


  const handleEditSeminar = (seminar) => {
    setEditingSeminar({ ...seminar, mode: 'edit' }); // Устанавливаем режим редактирования и данные семинара
    setModalMode('edit');
    setModalIsOpen(true);
  };

  const handleSaveSeminar = async (updatedSeminar) => {
    try {
      await axios.put(`${API_BASE_URL}/seminars/${updatedSeminar.id}`, updatedSeminar);
      // После успешного редактирования обновляем список семинаров
      fetchSeminars();
      setModalIsOpen(false);
      setModalMode(null);
      setEditingSeminar(null);
    } catch (err) {
      setError(err); // Обработка ошибки редактирования
      console.error("Ошибка редактирования семинара:", err);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalMode(null);
    setEditingSeminar(null);
  };

  if (loading) {
    return <p className='loading'>Загрузка семинаров...</p>;
  }

  if (error) {
    return <p className='error'>Ошибка загрузки семинаров: {error.message}</p>;
  }

  return (
    <div className="header">
      <h1>Список семинаров</h1>
      <SeminarList
        seminars={seminars}
        onDeleteSeminar={handleDeleteSeminar}
        onEditSeminar={handleEditSeminar}
      />

      <SeminarModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        seminar={editingSeminar}
        onDeleteConfirm={confirmDeleteSeminar}
        onSave={handleSaveSeminar}
      />
    </div>
  );
}

export default App;