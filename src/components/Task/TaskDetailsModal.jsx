import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskForm from './TaskForm';
import './Modal.css';
import Button from '../UI/Button';

const TaskDetailsModal = ({ isOpen, onClose, task }) => {
  const { updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(task.id, updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {isEditing ? (
          <>
            <h2 className="modal-title">Редактирование</h2>
            <TaskForm
              task={task}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2 className="modal-title">{task.title}</h2>
              <Button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </Button>
            </div>
            
            <div className="task-details-section">
              <h3>Описание:</h3>
              <p className="task-detail-description">
                {task.description || 'No description provided'}
              </p>
            </div>

            <div className="task-details-grid">
              <div className="task-detail">
                <span className="detail-label">Статус</span>
                <span className={`detail-value ${task.completed ? 'выполнено' : 'в работе'}`}>
                  {task.completed ? 'Выполнено' : 'В работе'}
                </span>
              </div>
              <div className="task-detail">
                <span className="detail-label">Выполнить до:</span>
                <span className="detail-value">
                  {task.dueDate 
                    ? new Date(task.dueDate).toLocaleDateString() 
                    : 'Не задано'}
                </span>
              </div>
              <div className="task-detail">
                <span className="detail-label">Видимость:</span>
                <span className="detail-value">
                  {task.isShared ? 'Общая' : 'Моя задача'}
                </span>
              </div>
              <div className="task-detail">
                <span className="detail-label">Создано:</span>
                <span className="detail-value">
                  {new Date(task.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal;