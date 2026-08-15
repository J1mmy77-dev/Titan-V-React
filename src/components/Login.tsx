import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CardAccion } from './CardAccion';
import Registro from './Registro';

export const Login: React.FC = () => {
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [rolObra, setRolObra] = useState<string>('Residente de Obra');
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(true);
  const [mostrarResumen, setMostrarResumen] = useState<boolean>(true);
  const [mostrarSoporte, setMostrarSoporte] = useState<boolean>(true);
  const [mostrarRegistro, setMostrarRegistro] = useState<boolean>(false);
  const [mensajeEnvio, setMensajeEnvio] = useState<string>('');
  const handleCorreoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCorreo(e.target.value);
  };
  const handleContrasenaChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setContrasena(e.target.value);
  };
  const handleRolChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setRolObra(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!correo || !contrasena) {
      setMensajeEnvio('Por favor diligencie todos los campos requeridos.');
      return;
    }
    setMensajeEnvio(`Sesión iniciada correctamente como ${rolObra} (${correo}).`);
  };
  const manejarRegistro = (datos: {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    usuario: string;
    contrasena: string;
  }): void => {
    alert(
      `Registro realizado correctamente\n\n` +
      `Nombre: ${datos.nombre} ${datos.apellido}\n` +
      `Correo: ${datos.correo}\n` +
      `Teléfono: ${datos.telefono}\n` +
      `Usuario: ${datos.usuario}`
    );
    setMostrarRegistro(false);
  };

  if (mostrarRegistro) {
    return <Registro onRegistrar={manejarRegistro} />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: '#fff',
      padding: '20px'
    }}>

      {/* CONTROLES DE VISIBILIDAD */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{ padding: '8px 12px', backgroundColor: '#333', color: '#ffcc00', border: '1px solid #ffcc00', borderRadius: '4px', cursor: 'pointer' }}
        >
          {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        </button>

        <button
          type="button"
          onClick={() => setMostrarResumen(!mostrarResumen)}
          style={{ padding: '8px 12px', backgroundColor: '#333', color: '#ffcc00', border: '1px solid #ffcc00', borderRadius: '4px', cursor: 'pointer' }}
        >
          {mostrarResumen ? 'Ocultar Resumen' : 'Mostrar Resumen'}
        </button>

        <button
          type="button"
          onClick={() => setMostrarSoporte(!mostrarSoporte)}
          style={{ padding: '8px 12px', backgroundColor: '#333', color: '#ffcc00', border: '1px solid #ffcc00', borderRadius: '4px', cursor: 'pointer' }}
        >
          {mostrarSoporte ? 'Ocultar Soporte' : 'Mostrar Soporte'}
        </button>
      </div>

      <div style={{
        backgroundColor: '#1e1e1e',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 15px rgba(255, 204, 0, 0.2)',
        width: '380px',
        textAlign: 'center',
        border: '1px solid #333'
      }}>

        <h2 style={{ color: '#fff', margin: '0 0 5px 0', fontSize: '24px', letterSpacing: '1px' }}>
          TITAN <span style={{ color: '#ffcc00' }}>V</span>
        </h2>
        <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '25px' }}>
          Sistema de Control de Acceso
        </p>

        {/* SECCIÓN 1: Formulario */}
        {mostrarFormulario && (
          <section style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#ffcc00' }}>Sección 1: Formulario de Acceso</h4>
            
            <form onSubmit={handleSubmit}>
              <CardAccion
                label="Correo Electrónico"
                tipo="email"
                placeholder="correo@ejemplo.com"
                valor={correo}
                onChange={handleCorreoChange}
              />

              <CardAccion
                label="Contraseña"
                tipo="password"
                placeholder="********"
                valor={contrasena}
                onChange={handleContrasenaChange}
              />

              <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                <label htmlFor="rol-select" style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>
                  Rol en Obra:
                </label>
                <select
                  id="rol-select"
                  value={rolObra}
                  onChange={handleRolChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    backgroundColor: '#121212',
                    color: '#fff',
                    border: '1px solid #333'
                  }}
                >
                  <option value="Administrador de Obra">Administrador de Obra</option>
                  <option value="Residente de Obra">Trabajador</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#ffcc00',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '10px',
                  fontSize: '15px',
                  color: '#000'
                }}
              >
                Iniciar Sesión
              </button>
            </form>
          </section>
        )}

        {/* SECCIÓN 2: Resumen en Tiempo Real */}
        {mostrarResumen && (
          <section style={{ border: '1px dashed #ffcc00', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'left', backgroundColor: '#25251a' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#ffcc00' }}>Sección 2: Resumen en Tiempo Real</h4>
            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Correo:</strong> {correo || <span style={{ color: '#777' }}>(Esperando ingreso...)</span>}</p>
            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Longitud contraseña:</strong> {contrasena.length} caracteres</p>
            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Rol Seleccionado:</strong> {rolObra}</p>
            {mensajeEnvio && (
              <p style={{ marginTop: '10px', color: '#52c41a', fontSize: '12px', fontWeight: 'bold' }}>
                {mensajeEnvio}
              </p>
            )}
          </section>
        )}

        {/* SECCIÓN 3: Soporte */}
        {mostrarSoporte && (
          <section style={{ border: '1px solid #333', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#888', backgroundColor: '#141414' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#aaa' }}>Sección 3: Información del Sistema</h4>
            <p style={{ margin: 0 }}>TITAN V - Gestión Operativa e Inventario de Obras de Construcción.</p>
          </section>
        )}

        <div style={{ marginTop: '20px', fontSize: '12px' }}>
          <a href="#forgot" style={{ color: '#ffcc00', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
            ¿Olvidaste tu contraseña?
          </a>

          <span style={{ color: '#888' }}>¿No tienes cuenta? </span>

          <button
            type="button"
            onClick={() => setMostrarRegistro(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffcc00',
              textDecoration: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '12px',
              padding: 0
            }}
          >
            Regístrate aquí
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;