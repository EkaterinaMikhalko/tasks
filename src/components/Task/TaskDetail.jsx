import { useTasks } from '../../context/TaskContext';

const TaskDetail = () => {
  const { currentTask } = useTasks();

  if (!currentTask) return null;

  return (
    <div className="task-detail">
      <h2>{currentTask.title}</h2>
      <p>{currentTask.description}</p>
      <div className="task-meta">
        <span>Статус: {currentTask.isShared ? 'Shared' : 'Private'}</span>
        <span>Выполнить до: {currentTask.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskDetail;