import React from 'react';

export const QuienesSomos: React.FC = () => {
  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#121212',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h2 style={{
        color: '#fff',
        fontSize: '28px',
        borderLeft: '4px solid #ffcc00',
        paddingLeft: '12px',
        marginBottom: '30px'
      }}>
        Quiénes Somos
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '25px',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#ffcc00', marginTop: 0, marginBottom: '15px' }}>MISIÓN</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '14px', margin: 0 }}>
            Transformar la gestión operativa de las empresas constructoras mediante una plataforma digital
            centralizada, que facilite el registro en tiempo real de información logística y técnica, optimizando la
            comunicación y la eficiencia en la ejecución de proyectos de infraestructura.
          </p>
        </div>
        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '25px',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#ffcc00', marginTop: 0, marginBottom: '15px' }}>VISIÓN</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '14px', margin: 0 }}>
            Convertirnos en la solución tecnológica líder para las pequeñas y medianas empresas de construcción en
            Latinoamérica, siendo el estándar de referencia en la organización, flexibilidad y transparencia en el seguimiento
            de obras.
          </p>
        </div>
        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '25px',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#ffcc00', marginTop: 0, marginBottom: '15px' }}>VALORES</h3>
          <ul style={{
            color: '#ccc',
            lineHeight: '1.8',
            fontSize: '14px',
            margin: 0,
            paddingLeft: '20px'
          }}>
            <li><strong>Eficiencia:</strong> Simplificamos procesos complejos para obtener resultados rápidos.</li>
            <li><strong>Transparencia:</strong> Mantenemos informadas a todas las partes interesadas.</li>
            <li><strong>Innovación:</strong> Utilizamos tecnología digital en obra.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;