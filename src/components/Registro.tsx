import { useState } from "react";
import ValidadorRegistro from "./ValidadorRegistro";
import "./Registro.css";

function Registro() {

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    fechaNacimiento: "",
    genero: "",
    correo: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    usuario: "",
    password: "",
    confirmarPassword: "",
    terminos: false
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value, type } = e.target;

    setFormulario({
      ...formulario,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value
    });
  };

  /*
   * Esta función pertenece al PADRE.
   *
   * El HIJO ValidadorRegistro la ejecuta
   * cuando termina de validar los datos.
   */
  const recibirValidacion = (
    resultado: boolean,
    mensaje: string
  ) => {

    console.log("Módulo: Registro");
    console.log("Resultado:", mensaje);

    if (resultado) {

      alert(
        "✓ REGISTRO VALIDADO\n\n" +
        "Los datos ingresados son correctos.\n\n" +
        "Nombre: " +
        formulario.nombre +
        " " +
        formulario.apellido +
        "\n" +
        "Correo: " +
        formulario.correo +
        "\n" +
        "Usuario: " +
        formulario.usuario +
        "\n\n" +
        mensaje
      );

    } else {

      alert(
        "⚠ ERROR EN EL REGISTRO\n\n" +
        mensaje
      );

    }
  };

  /*
   * Esta función también pertenece al PADRE.
   * Se ejecuta cuando se envía definitivamente
   * el formulario.
   */
  const registrarUsuario = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!formulario.terminos) {
      alert(
        "Debes aceptar los términos y condiciones."
      );
      return;
    }

    if (
      formulario.password !==
      formulario.confirmarPassword
    ) {
      alert(
        "Las contraseñas no coinciden."
      );
      return;
    }

    console.log(
      "Acción realizada en el módulo Registro"
    );

    alert(
      "✓ REGISTRO EXITOSO\n\n" +
      "Nombre: " +
      formulario.nombre +
      " " +
      formulario.apellido +
      "\n" +
      "Documento: " +
      formulario.tipoDocumento +
      " " +
      formulario.documento +
      "\n" +
      "Fecha de nacimiento: " +
      formulario.fechaNacimiento +
      "\n" +
      "Género: " +
      formulario.genero +
      "\n\n" +
      "Correo: " +
      formulario.correo +
      "\n" +
      "Teléfono: " +
      formulario.telefono +
      "\n" +
      "Dirección: " +
      formulario.direccion +
      "\n" +
      "Ciudad: " +
      formulario.ciudad +
      "\n\n" +
      "Usuario: " +
      formulario.usuario +
      "\n" +
      "Contraseña: " +
      formulario.password
    );
  };

  return (

    <div className="registro-page">

      <div className="registro-card">

        {/* ENCABEZADO */}

        <div className="registro-header">

          <div className="logo-registro">
            +
          </div>

          <h1>Crear cuenta</h1>

          <p>
            Completa tus datos para registrarte
          </p>

        </div>


        <form onSubmit={registrarUsuario}>

          {/* INFORMACIÓN PERSONAL */}

          <section className="seccion-formulario">

            <div className="titulo-seccion">

              <span>01</span>

              <div>
                <h2>Información personal</h2>
                <p>
                  Ingresa tus datos personales
                </p>
              </div>

            </div>


            <div className="form-grid">

              {/* NOMBRE */}

              <div className="campo">

                <label>
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  placeholder="Ingresa tu nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                />

              </div>


              {/* APELLIDO */}

              <div className="campo">

                <label>
                  Apellido
                </label>

                <input
                  type="text"
                  name="apellido"
                  placeholder="Ingresa tu apellido"
                  value={formulario.apellido}
                  onChange={handleChange}
                />

              </div>


              {/* TIPO DOCUMENTO */}

              <div className="campo">

                <label>
                  Tipo de documento
                </label>

                <select
                  name="tipoDocumento"
                  value={formulario.tipoDocumento}
                  onChange={handleChange}
                >

                  <option value="">
                    Seleccionar
                  </option>

                  <option value="CC">
                    Cédula de ciudadanía
                  </option>

                  <option value="TI">
                    Tarjeta de identidad
                  </option>

                  <option value="CE">
                    Cédula de extranjería
                  </option>

                </select>

              </div>


              {/* DOCUMENTO */}

              <div className="campo">

                <label>
                  Número de documento
                </label>

                <input
                  type="text"
                  name="documento"
                  placeholder="Número de documento"
                  value={formulario.documento}
                  onChange={handleChange}
                />

              </div>


              {/* FECHA */}

              <div className="campo">

                <label>
                  Fecha de nacimiento
                </label>

                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formulario.fechaNacimiento}
                  onChange={handleChange}
                />

              </div>


              {/* GENERO */}

              <div className="campo">

                <label>
                  Género
                </label>

                <select
                  name="genero"
                  value={formulario.genero}
                  onChange={handleChange}
                >

                  <option value="">
                    Seleccionar
                  </option>

                  <option value="Femenino">
                    Femenino
                  </option>

                  <option value="Masculino">
                    Masculino
                  </option>

                  <option value="Otro">
                    Otro
                  </option>

                  <option value="Prefiero no decirlo">
                    Prefiero no decirlo
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* CONTACTO */}

          <section className="seccion-formulario">

            <div className="titulo-seccion">

              <span>02</span>

              <div>

                <h2>
                  Información de contacto
                </h2>

                <p>
                  ¿Cómo podemos comunicarnos contigo?
                </p>

              </div>

            </div>


            <div className="form-grid">

              {/* CORREO */}

              <div className="campo campo-completo">

                <label>
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="correo"
                  placeholder="ejemplo@gmail.com"
                  value={formulario.correo}
                  onChange={handleChange}
                />

              </div>


              {/* TELEFONO */}

              <div className="campo">

                <label>
                  Teléfono
                </label>

                <input
                  type="tel"
                  name="telefono"
                  placeholder="300 000 0000"
                  value={formulario.telefono}
                  onChange={handleChange}
                />

              </div>


              {/* CIUDAD */}

              <div className="campo">

                <label>
                  Ciudad
                </label>

                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ej: Bogotá"
                  value={formulario.ciudad}
                  onChange={handleChange}
                />

              </div>


              {/* DIRECCION */}

              <div className="campo campo-completo">

                <label>
                  Dirección
                </label>

                <input
                  type="text"
                  name="direccion"
                  placeholder="Calle 00 #00-00"
                  value={formulario.direccion}
                  onChange={handleChange}
                />

              </div>

            </div>

          </section>


          {/* CUENTA */}

          <section className="seccion-formulario">

            <div className="titulo-seccion">

              <span>03</span>

              <div>

                <h2>
                  Información de cuenta
                </h2>

                <p>
                  Crea tus datos para acceder
                </p>

              </div>

            </div>


            <div className="form-grid">

              {/* USUARIO */}

              <div className="campo">

                <label>
                  Nombre de usuario
                </label>

                <input
                  type="text"
                  name="usuario"
                  placeholder="MiUsuario123"
                  value={formulario.usuario}
                  onChange={handleChange}
                />

              </div>


              {/* PASSWORD */}

              <div className="campo">

                <label>
                  Contraseña
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formulario.password}
                  onChange={handleChange}
                />

              </div>


              {/* CONFIRMAR */}

              <div className="campo campo-completo">

                <label>
                  Confirmar contraseña
                </label>

                <input
                  type="password"
                  name="confirmarPassword"
                  placeholder="Repite tu contraseña"
                  value={
                    formulario.confirmarPassword
                  }
                  onChange={handleChange}
                />

              </div>

            </div>

          </section>


          {/* TERMINOS */}

          <label className="terminos">

            <input
              type="checkbox"
              name="terminos"
              checked={formulario.terminos}
              onChange={handleChange}
            />

            <span>
              Acepto los términos y condiciones
            </span>

          </label>


          {/* HIJO */}

          <div className="validador-container">

            <div className="validador-info">

              <div className="icono-validacion">
                ✓
              </div>

              <div>

                <strong>
                  ¿Todo listo?
                </strong>

                <p>
                  Valida tus datos antes de crear
                  la cuenta.
                </p>

              </div>

            </div>


            <ValidadorRegistro
              datos={formulario}
              onValidacion={recibirValidacion}
            />

          </div>


          {/* BOTON PRINCIPAL */}

          <button
            type="submit"
            className="btn-registrar"
          >
            Crear cuenta
          </button>


          <p className="texto-final">
            Al registrarte, tus datos serán
            procesados de forma segura.
          </p>

        </form>

      </div>

    </div>
  );
}

export default Registro;