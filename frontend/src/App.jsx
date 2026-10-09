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
    const encodedPayload = token.split('.')[1];
    if (!encodedPayload) return false;
    const base64Payload = encodedPayload
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const paddedPayload = base64Payload.padEnd(Math.ceil(base64Payload.length / 4) * 4, '=');
    const binaryPayload = atob(paddedPayload);
    const payloadBytes = Uint8Array.from(binaryPayload, (character) => character.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));
    return Number.isFinite(payload.exp) && Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const valid = isTokenValid();
  if (!valid) {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
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