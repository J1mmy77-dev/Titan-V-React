import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/hooks';
import { fetchClima } from '../../redux/climaSlice';
import './PanelNotificaciones.css';

const PanelNotificaciones = () => {
  // Redux
  const dispatch = useAppDispatch();

  // Obtener información del clima desde Redux
  const {
    datos,
    cargando,
    error,
    ultimaActualizacion,
  } = useAppSelector((state) => state.clima);

  
  useEffect(() => {
    // Primera consulta
    dispatch(fetchClima());

    
    const intervalo = setInterval(() => {
      dispatch(fetchClima());
    }, 10000);

    
    return () => clearInterval(intervalo);
  }, [dispatch]);

  return (
    <div className="panel-notificaciones">
      <h2>Clima actual</h2>

      {}
      {cargando && (
        <p>Cargando clima...</p>
      )}

      {}
      {error && (
        <p>
          Error al obtener el clima: {error}
        </p>
      )}

      {/* Información del clima */}
      {datos && !cargando && (
        <div className="clima-info">
          <p>
            🌡️ Temperatura:{' '}
            {datos.temperatura} °C
          </p>

          <p>
            🌧️ Precipitación:{' '}
            {datos.precipitacion} mm
          </p>

          <p>
            ☁️ Código del clima:{' '}
            {datos.codigoClima}
          </p>

          <p>
            🕐 Hora:{' '}
            {datos.hora}
          </p>
        </div>
      )}

      {}
      {ultimaActualizacion && (
        <p className="ultima-actualizacion">
          Última actualización:{' '}
          {new Date(
            ultimaActualizacion
          ).toLocaleString()}
        </p>
      )}

      {}
      {!cargando && !error && !datos && (
        <p>
          No hay información del clima disponible.
        </p>
      )}
    </div>
  );
};

export default PanelNotificaciones;
