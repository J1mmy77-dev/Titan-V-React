import CardAccion from './CardAccion';

// Módulo Comentarios
// - Formulario sin hooks: se lee con FormData al enviar.
// - Usa CardAccion (Padre -> Hijo por props, Hijo -> Padre por callback).
const Comentarios = () => {
  const manejarEnvioComentario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const datosFormulario = new FormData(evento.currentTarget);
    const autor = datosFormulario.get('autor') as string;
    const comentario = datosFormulario.get('comentario') as string;

    alert(`Nuevo comentario:\nAutor: ${autor}\nComentario: ${comentario}`);

    evento.currentTarget.reset();
  };

  const manejarAccionComentario = (mensaje: string) => {
    alert(`Módulo Comentarios: ${mensaje}`);
    console.log(`[Módulo Comentarios] Acción recibida: ${mensaje}`);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '420px' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '15px' }}>Comentarios</h2>
      <p style={{ color: '#475569', marginBottom: '20px' }}>
        Deja tu opinión sobre un proyecto o servicio de Titan V.
      </p>

      <form onSubmit={manejarEnvioComentario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ color: '#334155', fontSize: '14px' }}>
          Nombre
          <input
            name="autor"
            type="text"
            required
            placeholder="Tu nombre"
            style={{ display: 'block', width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </label>

        <label style={{ color: '#334155', fontSize: '14px' }}>
          Comentario
          <textarea
            name="comentario"
            required
            placeholder="Escribe tu comentario aquí"
            rows={3}
            style={{ display: 'block', width: '100%', padding: '10px', marginTop: '4px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }}
          />
        </label>

        <button
          type="submit"
          style={{ marginTop: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Publicar Comentario
        </button>
      </form>

      <h3 style={{ color: '#0f172a', margin: '25px 0 15px' }}>Otras acciones</h3>
      <CardAccion
        titulo="Eliminar Comentario"
        descripcion="Borra un comentario que ya no quieras mantener visible."
        textoBoton="Eliminar Comentario"
        colorBoton="#dc2626"
        onEjecutarAccion={manejarAccionComentario}
      />
    </div>
  );
};

export default Comentarios;
