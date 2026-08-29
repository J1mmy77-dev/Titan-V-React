import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const LATITUD_DEFECTO = 4.7110;
const LONGITUD_DEFECTO = -74.0721;

export interface ClimaActual {
  temperatura: number;
  precipitacion: number;
  codigoClima: number;
  hora: string;
}

interface ClimaState {
  datos: ClimaActual | null;
  cargando: boolean;
  error: string | null;
  ultimaActualizacion: string | null;
}

const initialState: ClimaState = {
  datos: null,
  cargando: false,
  error: null,
  ultimaActualizacion: null,
};


export const fetchClima = createAsyncThunk(
  'clima/fetchClima',
  async (coords?: { lat: number; lon: number }) => {
    try {
      const ubicacion = coords ?? {
        lat: LATITUD_DEFECTO,
        lon: LONGITUD_DEFECTO,
      };

      const url = 'https://api.open-meteo.com/v1/forecast';

      const respuesta = await axios.get(url, {
        params: {
          latitude: ubicacion.lat,
          longitude: ubicacion.lon,
          current: 'temperature_2m,precipitation,weathercode',
          timezone: 'auto',
        },
      });

      
      if (!respuesta.data || !respuesta.data.current) {
        throw new Error(
          'No hay información del clima disponible en este momento.'
        );
      }

      const actual = respuesta.data.current;

      const clima: ClimaActual = {
        temperatura: actual.temperature_2m,
        precipitacion: actual.precipitation,
        codigoClima: actual.weathercode,
        hora: actual.time,
      };

      return clima;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error(
            'No hay conexión a Internet o no se puede conectar con el servicio del clima.'
          );
        }

        if (error.response.status >= 500) {
          throw new Error(
            'El servicio del clima no está disponible en este momento.'
          );
        }

        throw new Error(
          'No se pudo obtener la información del clima.'
        );
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Ocurrió un error inesperado al consultar el clima.');
    }
  }
);
const climaSlice = createSlice({
  name: 'clima',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClima.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })

      .addCase(fetchClima.fulfilled, (state, action) => {
        state.cargando = false;
        state.datos = action.payload;
        state.ultimaActualizacion = new Date().toISOString();
      })

      .addCase(fetchClima.rejected, (state, action) => {
        state.cargando = false;
        state.error =
          action.error.message ?? 'No se pudo obtener el clima';
      });
  },
});

export default climaSlice.reducer;
