import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chanting from './pages/Chanting';
import Reading from './pages/Reading';
import Journaling from './pages/Journaling';
import Login from './pages/Login';
import Register from './pages/Register';

const QA = () => <div className="p-10 text-2xl font-bold">❓ Q&A / Guidance (Coming Soon)</div>;

// Protects routes — redirects to /login if no token
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/*" element={
          <PrivateRoute>
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chanting" element={<Chanting />} />
                <Route path="/reading" element={<Reading />} />
                <Route path="/journaling" element={<Journaling />} />
                <Route path="/qa" element={<QA />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;