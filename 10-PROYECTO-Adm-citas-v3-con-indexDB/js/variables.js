import { generarId } from "./funciones.js";

// modo de edicion
export let editando = {
    value: false
};

// objeto de cita
export const citaObj = {
    id: generarId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

// referencia a la indexDN
export let DB = {
    value: null
}