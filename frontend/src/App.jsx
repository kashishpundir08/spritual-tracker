import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chanting from './pages/Chanting';
import Reading from './pages/Reading';
import Journaling from './pages/Journaling';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { wakeUpServer } from './api/apiClient';

const QA = () => <div className="p-10 text-2xl font-bold">❓ Q&A / Guidance (Coming Soon)</div>;

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() < expiry;
  } catch (e) {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const valid = isTokenValid();
  if (!valid) {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Wake up Render server when app loads
    wakeUpServer();
  }, []);

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <PrivateRoute>
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chanting" element={<Chanting />} />
                <Route path="/reading" element={<Reading />} />
                <Route path="/journaling" element={<Journaling />} />
                <Route path="/qa" element={<QA />} />
                <Route path="/profile" element={<Profile />} />
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