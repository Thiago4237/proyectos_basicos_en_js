import Notificacion from "./clases/Notificacion.js";
import AdminCitas from "./clases/AdminCitas.js";

import { citaObj, editando } from "./variables.js";
import { 
    formulario, formularioInput, pacienteInput, propietarioInput, 
    emailInput, fechaInput, sintomasInput 
} from "./selectores.js";

const citas = new AdminCitas()

// carga inicial de las citas que esten en bd del navegador
export async function cargarCitas() {
    await citas.cargarCitas()
}

export function datosCita(event) {
    citaObj[event.target.name] = event.target.value;
}

export function submitCita(event) {

    event.preventDefault();

    // validacion revisando que almenos algun dato cumpla la validacion 
    if(Object.values(citaObj).some(valor => valor === '')) {
        
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        });
        
        return;
    }

    editando.value ? citas.editar({...citaObj}) : citas.agregar({...citaObj});
    
    new Notificacion({
        texto: editando.value ? 'Paciente editado' : 'Paciente registrado',
        tipo: 'otro'
    })
    formulario.reset();
    reiniciarObjetoCita(); 
    formularioInput.value = 'Crear Cita';
    editando.value = false;

}

export function reiniciarObjetoCita() {

    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    });

}

export function generarId() {
    return Math.random().toString(36).substring(2, 18) + Date.now();
}

export function cargarEdicion(cita) {
    
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando.value = true;

    formularioInput.value = 'Guardar Cambios';
}