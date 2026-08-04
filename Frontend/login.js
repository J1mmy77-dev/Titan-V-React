function showForm(id) {
    document.querySelectorAll('.form-box').forEach(box => {
        box.classList.remove('active');
    });
    const elemento = document.getElementById(id);
    if(elemento) elemento.classList.add('active');
}

async function handleAuth(event, target) {
    event.preventDefault();

    if (target === 'main') {
        // Flujo de Inicio de Sesión Real conectado a FastAPI
        const form = event.target;
        const btn = form.querySelector('button');
        const textoOriginal = btn.innerHTML;
        
        // Capturar los valores del formulario de login
        const correo = form.querySelector('input[type="email"]').value;
        const contrasena = form.querySelector('input[type="password"]').value;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo_electronico: correo,
                    contrasena: contrasena
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardamos el estado y datos de la sesión en el navegador
                localStorage.setItem("sesionTitanV", "true");
                localStorage.setItem("token", data.token);
                localStorage.setItem("rol", data.rol);
                localStorage.setItem("usuario_id", data.usuario_id);

                alert(data.mensaje || "¡Inicio de sesión exitoso!");
                window.location.href = 'Dashboard.html'; // Redirige al panel principal
            } else {
                alert("Error: " + (data.detail || "Credenciales incorrectas"));
                btn.innerHTML = textoOriginal;
                btn.style.opacity = '1';
                btn.disabled = false;
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor backend. Asegúrate de que FastAPI esté encendido en http://127.0.0.1:8000");
            btn.innerHTML = textoOriginal;
            btn.style.opacity = '1';
            btn.disabled = false;
        }
        
    } else {
        // Flujo de Registro (simulado o pendiente de integrar con endpoint de registro)
        alert("¡Cuenta creada con éxito! Ya puedes iniciar sesión y empezar a crear proyectos.");
        showForm('loginBox');
    }
}

function handleRecover(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert("Se ha enviado un enlace de recuperación a: " + email);
    showForm('loginBox');
}