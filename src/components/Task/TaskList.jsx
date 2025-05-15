import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return <div className="no-tasks">Задачи не найдены. Создайте вашу первую задачу!</div>;
  }

  return (
    <div className="task-grid">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;