import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import Button from '../UI/Button';
import Message from '../UI/Message';

const LoginForm = ({ onSuccess }) => {
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { user, token } = await login(email, password);
      authLogin(user, token);
      onSuccess(); // Закрываем модальное окно после успешного входа
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <Message type="error" text={error} />}
      <div className="form-group">
        <label htmlFor="email">Эл. почта</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={loading} fullWidth>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  );
};

export default LoginForm;