import React from 'react';
import { CardAccion } from './CardAccion';

export interface LoginProps {
  correo: string;
  contrasena: string;
  onCorreoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContrasenaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnviar: (e: React.FormEvent) => void;
}

export const Login: React.FC<LoginProps> = ({
  correo,
  contrasena,
  onCorreoChange,
  onContrasenaChange,
  onEnviar
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212'
    }}>
      <div style={{
        backgroundColor: '#1e1e1e',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 15px rgba(255, 204, 0, 0.2)',
        width: '350px',
        textAlign: 'center',
        border: '1px solid #333'
      }}>
        <h2 style={{ color: '#fff', margin: '0 0 5px 0', fontSize: '24px', letterSpacing: '1px' }}>
          TITAN <span style={{ color: '#ffcc00' }}>V</span>
        </h2>
        <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '25px' }}>Bienvenido de nuevo</p>

        <form onSubmit={onEnviar}>
          <CardAccion
            label="Correo Electrónico"
            tipo="email"
            placeholder="correo@ejemplo.com"
            valor={correo}
            onChange={onCorreoChange}
          />

          <CardAccion
            label="Contraseña"
            tipo="password"
            placeholder="********"
            valor={contrasena}
            onChange={onContrasenaChange}
          />

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

        <div style={{ marginTop: '20px', fontSize: '12px' }}>
          <a href="#forgot" style={{ color: '#ffcc00', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
            ¿Olvidaste tu contraseña?
          </a>
          <span style={{ color: '#888' }}>¿No tienes cuenta? </span>
          <a href="#register" style={{ color: '#ffcc00', textDecoration: 'none', fontWeight: 'bold' }}>
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  );
};