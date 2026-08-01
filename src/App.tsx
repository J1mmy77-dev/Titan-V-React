import { useState } from 'react';
import Usuarios from './components/Usuarios';
import Productos from './components/Productos';
import { Sidebar } from './components/Sidebar';
import { ProyectosTab } from './components/ProyectosTab';
import { MaterialesTab } from './components/MaterialesTab';
import './App.css';

function App() {
  const [tabActual, setTabActual] = useState<string>('proyectos');

  const handleLogout = () => {
    alert('Sesión cerrada correctamente.');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
      <Sidebar activeTab={tabActual} onSelectTab={setTabActual} onLogout={handleLogout} />
      
      <div className="main-content">
        {tabActual === 'proyectos' && <ProyectosTab />}
        {tabActual === 'materiales' && <MaterialesTab />}
        {tabActual === 'usuarios' && <Usuarios />}
        {tabActual === 'productos' && <Productos />}
      </div>
    </div>
  );
}

export default App;