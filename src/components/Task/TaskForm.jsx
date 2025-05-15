import React from 'react';
import Button from '../UI/Button';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    isShared: task?.isShared || false,
    completed: task?.completed || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Название *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="dueDate">Выполнить до</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="isShared"
          name="isShared"
          checked={formData.isShared}
          onChange={handleChange}
        />
        <label htmlFor="isShared">Общая задача</label>
      </div>
 
      {task?.id && (
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          <label htmlFor="completed">Выполнено</label>
        </div>
      )}
      
      <div className="form-actions">
        <Button type="submit" variant="primary">
          {task?.id ? 'Обновить задачу' : 'Создать задачу'}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          Отмена
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;