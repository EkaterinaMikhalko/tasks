import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Добавляем useAuth

  // Используем useCallback для стабильной ссылки на функцию
  const fetchTasks = useCallback(async () => {
    if (!user) return; // Не пытаемся загрузить задачи без пользователя
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3001/tasks?userId=${user.id}`);
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]); // Зависимость только от user.id

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Теперь эффект зависит только от fetchTasks

  const addTask = async (taskData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/tasks', taskData);
      setTasks(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

 const removeTask = async (taskId) => {
  setLoading(true);
  try {
    // Оптимистичное обновление UI
    setTasks(prev => prev.filter(task => task.id !== taskId));
    
    // Отправляем запрос на удаление
    await axios.delete(`http://localhost:3001/tasks/${taskId}`);
  } catch (error) {
    // Восстанавливаем задачи при ошибке
    setTasks(prev => [...prev, tasks.find(t => t.id === taskId)]);
    
    // Специальная обработка ошибки 404
    if (error.response?.status === 404) {
      console.warn('Task already deleted on server');
      return; // Не бросаем ошибку для уже удаленных задач
    }
    
    setError(error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

const updateTask = async (id, taskData) => {
  setLoading(true);
  try {
    const response = await axios.patch(`http://localhost:3001/tasks/${id}`, taskData);
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...response.data } : task
    ));
    return response.data;
  } catch (error) {
    setError(error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    removeTask,
    updateTask, // Добавляем функцию в контекст
  };


  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);