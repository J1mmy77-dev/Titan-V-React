import React, { useState } from 'react';
import { CardAccion } from './CardAccion';

const Productos = () => {
  const [producto, setProducto] = useState('');

  const handleProductoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProducto(e.target.value);
  };

  const handleAccionProducto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!producto.trim()) {
      alert('Por favor, escribe el nombre del producto.');
      return;
    }

    alert(`Producto agregado: ${producto}`);

    console.log(`[Productos] Producto agregado: ${producto}`);

    setProducto('');
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
      <h2
        style={{
          color: '#0f172a',
          marginBottom: '15px'
        }}
      >
        Catálogo de Materiales y Productos
      </h2>

      <p
        style={{
          color: '#475569',
          marginBottom: '20px'
        }}
      >
        Inventario general disponible para la gestión de proyectos.
      </p>

      <form onSubmit={handleAccionProducto}>
        <CardAccion
          label="Nuevo Producto"
          tipo="text"
          placeholder="Escribe el nombre del producto"
          valor={producto}
          onChange={handleProductoChange}
        />

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
          Agregar Producto
        </button>
      </form>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          marginTop: '20px'
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f1f5f9',
              color: '#1e293b'
            }}
          >
            <th
              style={{
                padding: '12px',
                borderBottom: '1px solid #cbd5e1'
              }}
            >
              Código
            </th>

            <th
              style={{
                padding: '12px',
                borderBottom: '1px solid #cbd5e1'
              }}
            >
              Descripción del Material
            </th>

            <th
              style={{
                padding: '12px',
                borderBottom: '1px solid #cbd5e1'
              }}
            >
              Stock
            </th>

            <th
              style={{
                padding: '12px',
                borderBottom: '1px solid #cbd5e1'
              }}
            >
              Estado
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td
              style={{
                padding: '12px',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              MAT-001
            </td>

            <td
              style={{
                padding: '12px',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              Cemento Gris (Saco 50kg)
            </td>

            <td
              style={{
                padding: '12px',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              120
            </td>

            <td
              style={{
                padding: '12px',
                borderBottom: '1px solid #f1f5f9',
                color: '#2563eb',
                fontWeight: 'bold'
              }}
            >
              Disponible
            </td>
          </tr>

          <tr>
            <td style={{ padding: '12px' }}>
              MAT-002
            </td>

            <td style={{ padding: '12px' }}>
              Varilla Corrugada 3/8"
            </td>

            <td style={{ padding: '12px' }}>
              450
            </td>

            <td
              style={{
                padding: '12px',
                color: '#2563eb',
                fontWeight: 'bold'
              }}
            >
              Disponible
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Productos;