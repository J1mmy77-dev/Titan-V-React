import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProductoItem {
  codigo: string;
  descripcion: string;
  stock: number;
}

const Productos = () => {
  const [codigo, setCodigo] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [stock, setStock] = useState<number>(0);

  const [listaProductos, setListaProductos] = useState<ProductoItem[]>([
    { codigo: 'MAT-001', descripcion: 'Cemento Gris (Saco 50kg)', stock: 120 },
    { codigo: 'MAT-002', descripcion: 'Varilla Corrugada 3/8"', stock: 450 }
  ]);

  const [mostrarSeccionFormulario, setMostrarSeccionFormulario] = useState<boolean>(true);
  const [mostrarSeccionTabla, setMostrarSeccionTabla] = useState<boolean>(true);
  const [mostrarSeccionResumen, setMostrarSeccionResumen] = useState<boolean>(true);

  const handleAgregarProducto = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!codigo.trim() || !descripcion.trim()) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const nuevoItem: ProductoItem = {
      codigo,
      descripcion,
      stock
    };

    setListaProductos([...listaProductos, nuevoItem]);
    alert(`Producto agregado exitosamente: ${descripcion}`);

    setCodigo('');
    setDescripcion('');
    setStock(0);
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <h2 style={{ color: '#0f172a', marginBottom: '15px' }}>
        Gestion de Productos y Materiales
      </h2>

      <p style={{ color: '#475569', marginBottom: '20px' }}>
        Modulo asignado exclusivamente para el control de inventario de obra.
      </p>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setMostrarSeccionFormulario(!mostrarSeccionFormulario)}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          {mostrarSeccionFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        </button>
        <button
          onClick={() => setMostrarSeccionTabla(!mostrarSeccionTabla)}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          {mostrarSeccionTabla ? 'Ocultar Tabla' : 'Mostrar Tabla'}
        </button>
        <button
          onClick={() => setMostrarSeccionResumen(!mostrarSeccionResumen)}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          {mostrarSeccionResumen ? 'Ocultar Resumen' : 'Mostrar Resumen'}
        </button>
      </div>

      {mostrarSeccionFormulario && (
        <form onSubmit={handleAgregarProducto} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
          <h3>Registrar Nuevo Material</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Codigo:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)}
              placeholder="Ej. MAT-003"
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Descripcion:</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescripcion(e.target.value)}
              placeholder="Nombre del material"
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setStock(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Guardar Producto
          </button>
        </form>
      )}

      {mostrarSeccionTabla && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            marginTop: '20px'
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', color: '#1e293b' }}>
              <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Codigo</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Descripcion del Material</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Stock</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {listaProductos.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>{item.codigo}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>{item.descripcion}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>{item.stock}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', color: '#2563eb', fontWeight: 'bold' }}>
                  {item.stock > 0 ? 'Disponible' : 'Agotado'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mostrarSeccionResumen && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <h4>Resumen del Inventario</h4>
          <p>Total de productos registrados en el modulo: <strong>{listaProductos.length}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Productos;
