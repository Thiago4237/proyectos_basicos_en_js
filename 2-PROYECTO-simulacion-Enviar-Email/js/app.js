document.addEventListener('DOMContentLoaded', function() {
    
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    
    // seleccionar elementos interfaz
    const inputEmail = document.querySelector('#email')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')


    // registro eventos
    registrarEventos()

    function registrarEventos() {

        inputEmail.addEventListener('input', validarCampo)
        inputAsunto.addEventListener('input', validarCampo)
        inputMensaje.addEventListener('input', validarCampo)
        btnReset.addEventListener('click', confirmarAccion)
        formulario.addEventListener('submit', enviarEmail)
    }


    // registro funciones
    function validarCampo(e) {

        if (e.target.value.trim() === '') {
            email[e.target.name] = ''
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)    
            comprobarEmail()
            return;
        }
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            email[e.target.name] = ''
            mostrarAlerta("El email no es valido ", e.target.parentElement)
            comprobarEmail()
            return
        }

        limpiarAlerta(e.target.parentElement)

        // asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase()

        // comprobar obj email
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {

        // comprueba si ya existe la alerta
        limpiarAlerta(referencia)

        // generar alerta en html 
        const error = document.createElement('P')
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // inyectar error
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        // comprueba si ya existe la alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado
    }

    function comprobarEmail() {
        
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true
            return 
        }

        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false

    }

    function resetFormulario() {
        // reiniciar objeto 
        email.email = ''
        email.asunto = ''
        email.mensaje = ''

        // resetea formulario
        formulario.reset()
        comprobarEmail()
    }

    function confirmarAccion(e){
        e.preventDefault()
        resetFormulario()
    }

    function enviarEmail(e){
        
        e.preventDefault()

        spinner.classList.add('flex')
        spinner.classList.remove('hidden')
        
        setTimeout(() => {

            spinner.classList.remove('flex')
            spinner.classList.add('hidden')

            resetFormulario()

            // alerta 
            const alertaExito = document.createElement('P')
            alertaExito.classList.add(
                'bg-green-500', 'text-white', 'p-2', 'text-center', 
                'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase'
            )
            alertaExito.textContent = 'Mensaje enviado con exito'
            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove()
            }, 3000)

        }, 3000)

    }

})