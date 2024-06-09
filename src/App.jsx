// App.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './views/dashboard/Dashboard';
import Register from './views/register/Register';
import Users from './views/users/Users';
import NavigationBar from './shared/NavigationBar';
import './App.css';

function App() {
  return (
    <div>
      <NavigationBar />
      <div style={{ paddingTop: '40px' }}> {/* Agrega un padding top para que el contenido no esté oculto detrás de la barra de navegación */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users/:id" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
