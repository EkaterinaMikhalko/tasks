import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import Button from "../UI/Button";
import TaskDetailsModal from "../Task/TaskDetailsModal";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const { removeTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  //  const { updateTask } = useTasks();

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить задачу?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await removeTask(task.id);
    } catch (error) {
      if (error.response?.status !== 404) {
        alert(`Failed to delete task: ${error.message}`);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // const handleToggleComplete = async () => {
  //   try {
  //     await updateTask(task.id, {
  //       completed: !task.completed
  //     });
  //   } catch (error) {
  //     console.error('Ошибка при обновлении задачи:', error);
  //   }
  // };

  return (
    <>
      <div className={`task-card ${isDeleting ? "deleting" : ""}`}>
        <div
          className="task-content clickable"
          onClick={() => setIsDetailsOpen(true)}
        >
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">
              {task.description.length > 100
                ? `${task.description.substring(0, 100)}...`
                : task.description}
            </p>
          )}
          <div className="task-meta">
            {task.dueDate && (
              <span className="task-due-date">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            {/* {task.isShared && (
              <span className="task-shared-label">Общие задачи</span>
            )} */}
          </div>
        </div>

        {task.isShared && <span className="shared-badge">Общая задача</span>}

        <div className="task-actions">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailsOpen(true);
            }}
            variant="outline"
            size="small"
          >
            Показать
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            variant="danger"
            size="small"
            disabled={isDeleting}
          >
            {isDeleting ? "Удаление..." : "Удалить"}
          </Button>
        </div>
      </div>

      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard;
