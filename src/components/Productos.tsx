import { CardAccion } from './CardAccion';

const Productos = () => {
  const handleAccionProducto = (mensaje: string) => {
    alert(`Módulo: Productos\n${mensaje}`);
    console.log(`[Productos] ${mensaje}`);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '15px' }}>Catálogo de Materiales y Productos</h2>
      <p style={{ color: '#475569', marginBottom: '20px' }}>Inventario general disponible para la gestión de proyectos.</p>

      <CardAccion
        titulo="Nuevo Producto"
        descripcion="Agrega un nuevo material o producto al catálogo general."
        icono="fa-box-open"
        textoBoton="Agregar Producto"
        onAccion={handleAccionProducto}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', color: '#1e293b' }}>
            <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Código</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Descripción del Material</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Stock</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>MAT-001</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>Cemento Gris (Saco 50kg)</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>120</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', color: '#2563eb', fontWeight: 'bold' }}>Disponible</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>MAT-002</td>
            <td style={{ padding: '12px' }}>Varilla Corrugada 3/8"</td>
            <td style={{ padding: '12px' }}>450</td>
            <td style={{ padding: '12px', color: '#2563eb', fontWeight: 'bold' }}>Disponible</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
