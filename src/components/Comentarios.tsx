import { useEffect, useState } from 'react';
import {
  crearComentario,
  eliminarComentario,
  listarComentarios,
  type Comentario as ComentarioAPI,
} from '../api/tareas';

interface ComentariosProps {
  tareaId: number;
  usuarioId: number;
}

const Comentarios = ({ tareaId, usuarioId }: ComentariosProps) => {
  const [comentarios, setComentarios] = useState<ComentarioAPI[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const cargarComentarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await listarComentarios(tareaId);
      setComentarios(datos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar los comentarios.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarComentarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tareaId]);

  const manejarEnvioComentario = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const datosFormulario = new FormData(evento.currentTarget);
    const contenido = (datosFormulario.get('comentario') as string)?.trim();

    if (!contenido) return;
    if (contenido.length > 300) {
      setError('El comentario no puede superar los 300 caracteres.');
      return;
    }

    setEnviando(true);
    setError(null);
    try {
      await crearComentario(tareaId, usuarioId, contenido);
      evento.currentTarget.reset();
      await cargarComentarios();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo publicar el comentario.');
    } finally {
      setEnviando(false);
    }
  };

  const manejarEliminarComentario = async (comentarioId: number) => {
    setError(null);
    try {
      await eliminarComentario(comentarioId);
      setComentarios((prev) => prev.filter((c) => c.id !== comentarioId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar el comentario.');
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        maxWidth: '420px',
      }}
    >
      <h2 style={{ color: '#0f172a', marginBottom: '15px' }}>Comentarios</h2>
      <p style={{ color: '#475569', marginBottom: '20px' }}>
        Deja tu opinión sobre esta tarea.
      </p>

      {error && (
        <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
      )}

      <form
        onSubmit={manejarEnvioComentario}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <label style={{ color: '#334155', fontSize: '14px' }}>
          Comentario
          <textarea
            name="comentario"
            required
            maxLength={300}
            placeholder="Escribe tu comentario aquí (máx. 300 caracteres)"
            rows={3}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '4px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              resize: 'vertical',
            }}
          />
        </label>

        <button
          type="submit"
          disabled={enviando}
          style={{
            marginTop: '10px',
            backgroundColor: enviando ? '#93c5fd' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px',
            cursor: enviando ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {enviando ? 'Publicando…' : 'Publicar Comentario'}
        </button>
      </form>

      <h3 style={{ color: '#0f172a', margin: '25px 0 15px' }}>Historial</h3>

      {cargando ? (
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Cargando comentarios…</p>
      ) : comentarios.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Aún no hay comentarios en esta tarea.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {comentarios.map((c) => (
            <li
              key={c.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <div>
                <p style={{ margin: 0, color: '#0f172a', fontSize: '14px' }}>{c.contenido}</p>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Usuario #{c.usuario_id} · {new Date(c.fecha_comentario).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => manejarEliminarComentario(c.id)}
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comentarios;
