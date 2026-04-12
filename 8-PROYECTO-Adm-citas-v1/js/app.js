// selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]');
const contenedorCitas = document.querySelector('#citas');

// eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);

let editando = false;

// objeto de cita
const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

// clases
class Notificacion {

    constructor({texto, tipo}) {
        
        this.texto = texto;
        this.tipo = tipo;
        
        this.mostrar();
    }

    mostrar() {
        
        // eliminar alertas
        // const alertaPrevia = document.querySelectorAll('.alert');
        // alertaPrevia?.remove();
        document.querySelectorAll('.alert').forEach(el => el.remove());
        
        // crear notificacion
        const alerta = document.createElement('div');
        
        // asocia las clases 
        alerta.classList.add(
            'text-center', 'w-full', 'p-3', 'text-white', 'my-5', 
            'alert', 'uppercase', 'font-bold', 'text-sm'
        );
        
        this.tipo === 'error' 
            ? alerta.classList.add('bg-red-600') 
            : alerta.classList.add('bg-green-500')
        ;

        // mensaje de la notificacion
        alerta.textContent = this.texto;
        
        // insertar en el dom
        formulario.parentElement.insertBefore(alerta, formulario);

        // eliminar la notificacion despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }

}

class AdminCitas {

    constructor() {
        this.citas = [];
    }

    agregar(cita) {
        this.citas = [...this.citas, cita];
        this.mostrar();
    }

    editar(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        this.mostrar();
    }

    eliminar(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
        this.mostrar();
    }

    mostrar() {
        // limpiar html previo
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

        // comporobar si hay citas
        if(this.citas.length === 0) {
            contenedorCitas.innerHTML = '<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>';
            return;
        }

        // generacion de citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            const clone = structuredClone(cita);
            btnEditar.onclick = () => cargarEdicion(clone);

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            btnEliminar.onclick = () => this.eliminar(cita.id)

            const contenedorBotones = document.createElement('div')
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10');

            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);

            contenedorCitas.appendChild(divCita);
        }); 
    }

}

// funciones 
function datosCita(event) {
    citaObj[event.target.name] = event.target.value;
}

const citas = new AdminCitas();

function submitCita(event) {

    event.preventDefault();

    // validacion revisando que almenos algun dato cumpla la validacion 
    if(Object.values(citaObj).some(valor => valor === '')) {
        
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        });
        
        return;
    }

    editando ? citas.editar({...citaObj}) : citas.agregar({...citaObj});
    
    new Notificacion({
        texto: editando ? 'Paciente editado' : 'Paciente registrado',
        tipo: 'otro'
    })
    formulario.reset();
    reiniciarObjetoCita(); 
    formularioInput.value = 'Crear Cita';
    editando = false;

}

function reiniciarObjetoCita() {

    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    });

}

function generarId() {
    return Math.random().toString(36).substring(2, 18) + Date.now();
}

function cargarEdicion(cita) {
    
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando = true;

    formularioInput.value = 'Guardar Cambios';
}