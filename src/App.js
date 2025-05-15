import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Layout />
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;