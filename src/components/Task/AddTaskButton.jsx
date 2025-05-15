import { useState } from 'react';
import Button from '../UI/Button';
import TaskModal from './TaskModal';
import TaskForm from './TaskForm';

export const AddTaskButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="Add new task"
      >
        ＋ Добавить задачу
      </Button>

      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Создать</h2>
        <TaskForm onSubmit={() => setIsOpen(false)} />
      </TaskModal>
    </>
  );
};