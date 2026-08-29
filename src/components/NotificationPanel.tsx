// src/components/NotificationPanel.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../redux/notificationsSlice';
import type { RootState, AppDispatch } from '../redux/store';

const NotificationPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.notifications);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          position: 'relative',
          fontSize: '20px'
        }}
      >
        🔔
        {items.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '10px'
          }}>
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          width: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          padding: '15px',
          color: '#333',
          textAlign: 'left'
        }}>
          <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            Panel de Notificaciones
          </h4>
          
          {status === 'loading' && <p>Cargando...</p>}
          {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}
          
          {status === 'succeeded' && items.map((item: any) => (
            <div key={item.id} style={{ 
              padding: '8px 0', 
              borderBottom: '1px solid #f0f0f0',
              fontSize: '13px' 
            }}>
              <strong>{item.title}</strong>
              <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '11px' }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;