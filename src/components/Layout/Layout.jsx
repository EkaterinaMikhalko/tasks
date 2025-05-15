import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import AuthModal from '../Auth/AuthModal';
import TaskModal from '../Task/TaskModal';
import TaskForm from '../Task/TaskForm';
import TaskList from '../Task/TaskList';
import Loader from '../UI/Loader';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';

const Layout = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const { tasks, loading: tasksLoading, error, fetchTasks, addTask } = useTasks();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all'); 

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const handleTaskSubmit = async (taskData) => {
    try {
      await addTask({
        ...taskData,
        userId: user.id,
        createdAt: new Date().toISOString(),
        completed: false
      });
      setIsTaskModalOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'private') {
      return task.userId === user?.id && !task.isShared;
    } else if (taskFilter === 'shared') {
      return task.isShared; 
    }
    return true; 
  });

  const privateTasksCount = tasks.filter(t => t.userId === user?.id && !t.isShared).length;
  const sharedTasksCount = tasks.filter(t => t.isShared).length;

  if (authLoading) {
    return <Loader />;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Manager</h1>
        {user ? (
          <div className="header-controls">
            <span>Добро пожаловать, {user.name}</span>
            <div className="header-buttons">
              <Button 
                onClick={() => setIsTaskModalOpen(true)}
                data-testid="add-task-button"
              >
                ＋Добавить задачу
              </Button>
              <Button onClick={logout} variant="outline">
                Выйти
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setIsAuthModalOpen(true)}>Войти</Button>
        )}
      </header>
      
      <main className="main-content">
        {user ? (
          <>
            {tasksLoading ? (
              <Loader />
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div className="dashboard">
                <div className="dashboard-controls">
                  <h2>
                    {taskFilter === 'all' && 'Все задачи'}
                    {taskFilter === 'private' && 'Мои задачи'}
                    {taskFilter === 'shared' && 'Общие задачи'}
                    ({filteredTasks.length})
                  </h2>
                  <div className="task-filters">
                    <Button 
                      variant={taskFilter === 'all' ? 'primary' : 'outline'}
                      onClick={() => setTaskFilter('all')}
                    >
                      Все ({tasks.length})
                    </Button>
                    <Button 
                      variant={taskFilter === 'private' ? 'primary' : 'outline'}
                      onClick={() => setTaskFilter('private')}
                    >
                      Мои задачи ({privateTasksCount})
                    </Button>
                    <Button 
                      variant={taskFilter === 'shared' ? 'primary' : 'outline'}
                      onClick={() => setTaskFilter('shared')}
                    >
                      Общие задачи ({sharedTasksCount})
                    </Button>
                  </div>
                </div>
                <TaskList tasks={filteredTasks} />
              </div>
            )}
          </>
        ) : (
          <div className="welcome-message">
            <h2>Пожалуйста, авторизуйтесь</h2>
          </div>
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {user && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
        >
          <h2>Новая задача</h2>
          <TaskForm 
            onSubmit={handleTaskSubmit}
            onCancel={() => setIsTaskModalOpen(false)}
          />
        </TaskModal>
      )}
    </div>
  );
};

export default Layout;