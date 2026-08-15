import { useEffect, useState } from 'react';
import { listarTareas, type Tarea } from '../api/tareas';
import Comentarios from './Comentarios';

// TODO: reemplazar por el usuario autenticado real cuando el login se
// conecte a POST /auth/login (ver Login.tsx / LoginPage.tsx).
const USUARIO_ACTUAL_ID = 1;

export const TareasTab = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);

  useEffect(() => {
    const cargarTareas = async () => {
      setCargando(true);
      setError(null);
      try {
        const datos = await listarTareas();
        setTareas(datos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar las tareas.');
      } finally {
        setCargando(false);
      }
    };
    cargarTareas();
  }, []);

  return (
    <div className="tab-content active">
      <div className="section-header">
        <h2><i className="fas fa-list-check"></i> Tareas por Proyecto</h2>
      </div>

      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      <div className="grid">
        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-clipboard-list"></i> Tareas Registradas</h3>
          </div>
          <div className="project-container">
            {cargando ? (
              <div className="empty-msg">Cargando tareas…</div>
            ) : tareas.length === 0 ? (
              <div className="empty-msg">No hay tareas registradas actualmente.</div>
            ) : (
              tareas.map((t) => (
                <div
                  key={t.id}
                  className="project-item"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: tareaSeleccionada?.id === t.id ? '#eff6ff' : undefined,
                  }}
                  onClick={() => setTareaSeleccionada(t)}
                >
                  <div>
                    <h4>{t.nombre_tarea}</h4>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      Estado: {t.estado} · Proyecto #{t.proyecto_id}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {tareaSeleccionada && (
          <div className="card" style={{ padding: '10px' }}>
            <Comentarios tareaId={tareaSeleccionada.id} usuarioId={USUARIO_ACTUAL_ID} />
          </div>
        )}
      </div>
    </div>
  );
};
