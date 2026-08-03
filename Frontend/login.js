function showForm(id) {
    document.querySelectorAll('.form-box').forEach(box => {
        box.classList.remove('active');
    });
    const elemento = document.getElementById(id);
    if(elemento) elemento.classList.add('active');
}

function handleAuth(event, target) {
    event.preventDefault();

    if (target === 'main') {
        // Flujo de Inicio de Sesión
        const btn = event.target.querySelector('button');
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            // Guardamos el estado de la sesión
            localStorage.setItem("sesionTitanV", "true"); 
            window.location.href = 'dashboard.html';
        }, 1200);
        
    } else {
        // Flujo de Registro
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