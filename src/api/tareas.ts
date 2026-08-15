
const API_BASE_URL = 'http://localhost:8000';

export type EstadoTarea = 'Pendiente' | 'En Proceso' | 'Completada';

export interface Tarea {
  id: number;
  nombre_tarea: string;
  descripcion: string;
  estado: EstadoTarea;
  fecha_asignacion: string;
  proyecto_id: number;
  usuario_id: number;
  comentarios: Comentario[];
}

export interface Comentario {
  id: number;
  contenido: string;
  fecha_comentario: string;
  usuario_id: number;
}

async function manejarRespuesta<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detalle = 'Error en la solicitud';
    try {
      const data = await res.json();
      detalle = data.detail ?? detalle;
    } catch {
      // respuesta sin cuerpo JSON (ej. 204)
    }
    throw new Error(detalle);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listarTareas(proyectoId?: number): Promise<Tarea[]> {
  const url = new URL(`${API_BASE_URL}/tareas/`);
  if (proyectoId !== undefined) {
    url.searchParams.set('proyecto_id', String(proyectoId));
  }
  const res = await fetch(url.toString());
  return manejarRespuesta<Tarea[]>(res);
}

export async function obtenerTarea(tareaId: number): Promise<Tarea> {
  const res = await fetch(`${API_BASE_URL}/tareas/${tareaId}`);
  return manejarRespuesta<Tarea>(res);
}

export async function listarComentarios(tareaId: number): Promise<Comentario[]> {
  const res = await fetch(`${API_BASE_URL}/tareas/${tareaId}/comentarios`);
  return manejarRespuesta<Comentario[]>(res);
}

export async function crearComentario(
  tareaId: number,
  usuarioId: number,
  contenido: string
): Promise<Comentario> {
  const url = new URL(`${API_BASE_URL}/tareas/${tareaId}/comentarios`);
  url.searchParams.set('usuario_id', String(usuarioId));

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contenido }),
  });
  return manejarRespuesta<Comentario>(res);
}

export async function eliminarComentario(comentarioId: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/tareas/comentarios/${comentarioId}`, {
    method: 'DELETE',
  });
  return manejarRespuesta<void>(res);
}
