<<<<<<< HEAD
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
=======
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CardAccion } from './CardAccion';

// Definimos la estructura de un producto para el tipado estricto
interface ProductoItem {
  codigo: string;
  descripcion: string;
  stock: number;
}

const Productos = () => {
  // Manejo de estado local con tipado estricto para los 3 datos requeridos
  const [codigo, setCodigo] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [stock, setStock] = useState<number>(0);

  // Estado para mostrar la lista de productos dinámicamente
  const [listaProductos, setListaProductos] = useState<ProductoItem[]>([
    { codigo: 'MAT-001', descripcion: 'Cemento Gris (Saco 50kg)', stock: 120 },
    { codigo: 'MAT-002', descripcion: 'Varilla Corrugada 3/8"', stock: 450 }
  ]);

  // Estado para mostrar/ocultar secciones dinámicamente (Requisito de la Actividad 2)
  const [mostrarSeccionFormulario, setMostrarSeccionFormulario] = useState<boolean>(true);
  const [mostrarSeccionTabla, setMostrarSeccionTabla] = useState<boolean>(true);
  const [mostrarSeccionResumen, setMostrarSeccionResumen] = useState<boolean>(true);

  const handleAgregarProducto = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!codigo.trim() || !descripcion.trim()) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Nuevo producto ingresado por el usuario
    const nuevoItem: ProductoItem = {
      codigo,
      descripcion,
      stock
    };

    // Actualizamos la lista dinámicamente
    setListaProductos([...listaProductos, nuevoItem]);
    alert(`Producto agregado exitosamente: ${descripcion}`);

    // Limpiar campos
    setCodigo('');
    setDescripcion('');
    setStock(0);
>>>>>>> e806def24b83434228d85af47d1f823891da2ed5
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
<<<<<<< HEAD
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
=======
      <h2 style={{ color: '#0f172a', marginBottom: '15px' }}>
        Gestión de Productos y Materiales
      </h2>

      <p style={{ color: '#475569', marginBottom: '20px' }}>
        Módulo asignado exclusivamente para el control de inventario de obra.
      </p>

      {/* Botones de control para mostrar y ocultar las 3 secciones requeridas */}
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

      {/* SECCIÓN 1: Formulario con al menos 3 datos y tipado estricto */}
      {mostrarSeccionFormulario && (
        <form onSubmit={handleAgregarProducto} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
          <h3>Registrar Nuevo Material</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Código:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)}
              placeholder="Ej. MAT-003"
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>Descripción:</label>
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

      {/* SECCIÓN 2: Tabla de visualización dinámica */}
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
              <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Código</th>
              <th style={{ padding: '12px', borderBottom: '1px solid #cbd5e1' }}>Descripción del Material</th>
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

      {/* SECCIÓN 3: Resumen dinámico */}
      {mostrarSeccionResumen && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <h4>Resumen del Inventario</h4>
          <p>Total de productos registrados en el módulo: <strong>{listaProductos.length}</strong></p>
        </div>
      )}
>>>>>>> e806def24b83434228d85af47d1f823891da2ed5
    </div>
  );
};

export default Productos;